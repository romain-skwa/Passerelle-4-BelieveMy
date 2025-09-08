// Dans ce fichier, on aura toutes nos requêtes qui nous permettront de créer le nouveau Créateur

"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-email-syntax";
import { Resend } from "resend";
 
export const newCreatorData = async (
  username,
  email,
  password,
  passwordconfirm,
  language = "fr" // Ajout du paramètre langue avec valeur par défaut
) => {
  // Traductions
  const translations = {
    fr: {
      emptyFields: "Aucun champ ne doit être vide.",
      passwordsNotMatch: "Les mots de passe ne sont pas identiques",
      invalidEmail: "veuilles entrer un email valide",
      passwordRequirements: "Le mot de passe doit contenir au moins un chiffre et au moins une lettre",
      emailAlreadyUsed: "Cet email est déjà utilisé",
      usernameAlreadyUsed: "Ce pseudo est déjà utilisé",
      emailSent: "Un courriel vous a été envoyé.",
      emailError: "Erreur lors de l'envoi de l'email.",
      welcomeSubject: "Bienvenue sur This is MY game",
      welcomeMessage: "Nous sommes heureux de vous accueillir parmi nous."
    },
    en: {
      emptyFields: "No field should be empty.",
      passwordsNotMatch: "The passwords do not match",
      invalidEmail: "Please enter a valid email",
      passwordRequirements: "The password must contain at least one digit and at least one letter",
      emailAlreadyUsed: "This email is already used",
      usernameAlreadyUsed: "This username is already used",
      emailSent: "An email has been sent to you.",
      emailError: "Error sending email.",
      welcomeSubject: "Welcome to This is MY game",
      welcomeMessage: "We are happy to welcome you among us."
    }
  };

  // Si la langue n'est pas français, utiliser l'anglais
  const t = language === "fr" ? translations.fr : translations.en;

  // If a field is empty
  if (!username || !email || !password || !passwordconfirm) {
    return { success: false, message: t.emptyFields };
  }

  // Check if passwords are identical
  if (password !== passwordconfirm) {
    return { success: false, message: t.passwordsNotMatch };
  }

  // Check if the email is valid
  if (!checkEmail(email)) {
    return { success: false, message: t.invalidEmail };
  }

  // Check if password is valid
  if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
    return { success: false, message: t.passwordRequirements };
  }
  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // Add the new data about the users
    // 1 -- Verify if this email is already used
    // Select the "créateurs" collection
    let user = await db
      .collection("créateurs")
      .find({ email }) // Might be writted .find({email: email})
      .limit(1)
      .toArray();

    // If the email is already used
    if (user.length !== 0) {
      await client.close();
      console.log("Cet email est déjà utilisé");
      return { success: false, message: t.emailAlreadyUsed };
    }

    // 2 -- Verify if this pseudo is already used
    let pseudo = await db
      .collection("créateurs")
      .find({ username })// Might be writted .find({username: username})
      .limit(1)
      .toArray();

    // If the pseudo is already used
    if (pseudo.length !== 0) {
      await client.close();
      console.log("Ce pseudo est déjà utilisé");
      return { success: false, message: t.usernameAlreadyUsed };
    }

    // 3 -- Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // 4 -- Create the user
    await db.collection("créateurs").insertOne({
      username,
      email,
      password: encryptedPassword,
      logoUrl: "",
      bio: "Biographie",
      creation: new Date(),
    });

    // 5 -- Sending confirmation email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const decodedUsername = decodeURIComponent(username);

        const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [email],
          subject: t.welcomeSubject,
          html: `<p style="text-align: center;">This is my game.com</p> <p>Bienvenue <u>${decodedUsername}</u>.</p> <p>${t.welcomeMessage}</p>`,
        });

        if (error) {
          console.error({ error });    
          return { success: false, message: t.emailError };    
        }    
    
        return { success: true, message: t.emailSent }; // Return success message   

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      console.log('Erreur lors de l\'envoi de l\'email:', error);
      return { success: false, message: t.emailError };
      }
    } catch (error) {
      await client.close(); // We close the connexion to the cluster
      throw new Error(error);
    }
};