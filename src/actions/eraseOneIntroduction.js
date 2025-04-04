"use server";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const deleteIntroduction = async (gameId, nameOfGameUpdate) => {
    // Get user session
    const session = await getServerSession(authOptions);
    const objectId = ObjectId.createFromHexString(gameId);

    let client;
    try {
        // 1 -- Connect to MongoDB database
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        // 2 -- Find the game
        const result = await db.collection("introduction-database").find({ _id: objectId }).toArray();

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
        const decodedUsername = decodeURIComponent(session.user.username); // Name of user connected
        const email = session.user.email; // Mail of user connected

        try {
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [email],
                subject: `Suppression de la présentation du jeu : ${nameOfGameUpdate}.`,
                html: `<p style="text-align: center;">This is my game.com</p>
                       <p><u>${decodedUsername}</u>, nous vous confirmons que la présentation du jeu : <b>${nameOfGameUpdate}</b> a bien été effacée.</p>
                       <p>Si ce n'était pas vraiment vous qui avez demandé la suppression, c'est ballot.</p>`,
            });

            if (error) {
                console.error({ error });
                return { success: false, message: 'Erreur lors de l\'envoi de l\'email.' };
            }

            // Cache revalidation
            revalidatePath("/");

            return { success: true, message: 'Un courriel vous a été envoyé.' };
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email:', emailError);
            return { success: false, message: 'Erreur lors de l\'envoi de l\'email.' };
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message); 
    } finally {
        await client?.close(); // Make sure to close the connection
    }
};

export default deleteIntroduction;