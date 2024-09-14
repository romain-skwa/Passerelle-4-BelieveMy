// Dans ce fichier, on aura toutes nos requêtes qui nous permettront de créer le nouveau Créateur

"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-email-syntax";
import { toast } from "react-toastify";

export const newCreatorData = async (
  username,
  email,
  password,
  passwordconfirm
) => {
  // If a field is empty
  if (!username || !email || !password || !passwordconfirm) {
    // Notification
    return toast.error("Aucun champ ne doit être vide.");
    // Ne s'affiche pas puisque "required" est déjà utilisé. Je laisse comme ça pour l'instant.
  }

  // Check if passwords are identical
  if (password !== passwordconfirm) {
    return toast.error("Les mots de passe ne sont pas identiques");
  }

  // Check if the email is valid
  if (!checkEmail(email)) {
    return toast.error("veuilles entrer un email valide");
  }

  // Check if password is valid
  if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
    return toast.error(
      "Le mot de passe doit contenir au moins un chiffre et au moins une lettre"
    );
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
      .find({ email })
      .limit(1)
      .toArray();

    // If the email is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("Cet email est déjà utilisé");
    }

    // 2 -- Verify if this pseudo is already used
    let pseudo = await db
      .collection("créateurs")
      .find({ username })
      .limit(1)
      .toArray();

    // If the pseudo is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("Ce pseudo est déjà utilisé");
    }

    // 3 -- Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // 4 -- Create the user
    await db.collection("créateurs").insertOne({
      username,
      email,
      password: encryptedPassword,
      profile: "/picture.png",
      bio: "Biographie",
      url: "",
      creation: new Date(),
    });
  } catch (error) {
    await client.close(); // On ferme la connexion au cluster
    throw new Error(error);
  }

  await client.close(); // Quand tout est fini, on ferme la connexion.
};
