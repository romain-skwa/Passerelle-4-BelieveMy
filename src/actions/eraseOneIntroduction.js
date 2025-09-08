"use server";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const deleteIntroduction = async (gameId, nameOfGame, language = "fr") => {
  // Get user session
  const session = await getServerSession(authOptions);
  const objectId = ObjectId.createFromHexString(gameId);

  // Traductions
  const translations = {
    fr: {
      subject: `Suppression de la présentation du jeu : ${nameOfGame}.`,
      content: `<p><u>${decodeURIComponent(session.user.username)}</u>, nous vous confirmons que la présentation du jeu : <b>${nameOfGame}</b> a bien été effacée.</p>
                <p>Si ce n'était pas vraiment vous qui avez demandé la suppression, c'est ballot.</p>`,
      emailSent: "Un courriel vous a été envoyé.",
      emailError: "Erreur lors de l'envoi de l'email."
    },
    en: {
      subject: `Deletion of the game presentation : ${nameOfGame}.`,
      content: `<p><u>${decodeURIComponent(session.user.username)}</u>, we confirm that the presentation of the game : <b>${nameOfGame}</b> has been successfully deleted.</p>
                <p>If it wasn't really you who requested the deletion, that's unfortunate.</p>`,
      emailSent: "An email has been sent to you.",
      emailError: "Error sending email."
    }
  };

  // When the language is not french, use english
  const t = language === "fr" ? translations.fr : translations.en;

  let client;
  try {
    // 1 -- Connect to MongoDB database
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // 2 -- Find the game
    const result = await db
      .collection("introduction-database")
      .find({ _id: objectId })
      .toArray();

    // 3 -- Check if the game exists
    if (result.length === 0) {
      throw new Error("Aucune présentation trouvée avec cet ID de jeu.");
    }

    // 4 -- Check if the user is the author of this introduction
    if (result[0].username !== session.user.username) {
      throw new Error("Vous n'êtes pas l'auteur de cette présentation.");
    }

    // 5 -- Delete the introduction
    await db.collection("introduction-database").deleteOne({ _id: objectId });

    // 6 -- Sending confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const email = session.user.email; // Mail of user connected

    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: t.subject,
        html: `<p style="text-align: center;">This is my game.com</p>${t.content}`,
      });

      if (error) {
        console.error({ error });
        return {
          success: false,
          message: t.emailError,
        };
      }

      // Cache revalidation
      revalidatePath("/");

      return { success: true, message: t.emailSent };
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      return { success: false, message: t.emailError };
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  } finally {
    await client?.close(); // Make sure to close the connection
  }
};

export default deleteIntroduction;
