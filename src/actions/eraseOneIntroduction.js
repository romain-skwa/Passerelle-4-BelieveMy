"use server";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const deleteIntroduction = async (gameId, nameOfGameUpdate) => {
    // Obtenir la session de l'utilisateur
    const session = await getServerSession(authOptions);
    const objectId = ObjectId.createFromHexString(gameId);

    let client;
    try {
        // 1 -- Connecter à la base de données MongoDB
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        // 2 -- Trouver le jeu
        const result = await db.collection("introduction-database").find({ _id: objectId }).toArray();

        // 3 -- Vérifier si le jeu existe
        if (result.length === 0) {
            throw new Error("Aucune présentation trouvée avec cet ID de jeu.");
        }

        // 4 -- Vérifier si l'utilisateur est l'auteur de cette introduction
        if (result[0].username !== session.user.username) {
            throw new Error("Vous n'êtes pas l'auteur de cette présentation.");
        }

        // 5 -- Supprimer l'introduction
        await db.collection("introduction-database").deleteOne({ _id: objectId });

        // 6 -- Envoi de l'email de confirmation
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

            // Révalidation du cache
            revalidatePath("/");

            return { success: true, message: 'Un courriel vous a été envoyé.' };
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email:', emailError);
            return { success: false, message: 'Erreur lors de l\'envoi de l\'email.' };
        }
    } catch (error) {
        console.error(error);
        throw new Error(error.message); // Renvoie l'erreur
    } finally {
        await client?.close(); // Assurez-vous de fermer la connexion
    }
};

export default deleteIntroduction;