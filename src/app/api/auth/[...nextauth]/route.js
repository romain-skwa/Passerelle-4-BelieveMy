// Afin de se connecter, il faut paramétrer le système d'API de next.js

import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions = {
    /* Les providers sont des services tiers qui gèrent les informations d'identification des utilisateurs, 
    comme les mots de passe, les adresses e-mail, les comptes sociaux, etc.*/
    providers: [
        Credentials({
            name: "credentials"/* Ne jamais mettre de majuscule dans ce nom */,
            // Nom qu'on utilisera quand on voudra se servir de SignIn
            credentials:{},
            async authorize(credentials) { // Ici on va recevoir les Credentials : les données
                const { email, password } = credentials;

                try {
                    // Connect to the MongoDB cluster
                    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

                    // Connect to the Mongodb Database
                    const db = client.db(process.env.MONGODB_DATABASE);

                    // 1 -- Get the user for this email
                    // Select the "créateurs" collection
                    let createurs = await db.collection("créateurs").find({email}).limit(1).toArray();

                    // If the email is not used
                    if(createurs.length === 0) {
                        await client.close();
                        throw new Error("Problème de connexion");
                    }

                    // 2 -- Verify the password
                    const isPasswordValid = await bcrypt.compare(password, createurs[0].password);

                    // if the password is not valid
                    if (!isPasswordValid) {
                        await client.close();
                        throw new Error("Problème de connexion");
                    }

                    // 3 -- Our user is authenticated
                    // Format user Do NOT add sensitive data
// Tout ce qu'on va stocker ici sera visible dans le cookie. Donc interdiction d'y stocker des données sensibles
                    createurs = createurs.map(createurs => ({
                        _id: createurs._id.toString(),
                        username: decodeURIComponent(createurs.username),
                        email: createurs.email,
                        profile: createurs.profile,
                    }))[0];
                    await client.close();
                    return createurs;
                } catch (e) {
                    throw new Error(e.message);
                }
            }
        })
    ],
    session: {
        strategy: "jwt" // La stratégie du JSon Web Token pour créer le cookie et identifier l'utilisateur
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { // déterminer où se situe notre formulaire de connexion
        signIn: "/src/app/creators/login"
    },
    callbacks: { // ce sont des fonctions qui sont appelés quand on détecte un JSon Web Token
        async jwt({token, user}) {
            user && (token.user = user);// Si user existe et si le user correspond à celui du token
            return token; // On retourne ce token et on va s'en servir après
        },
        async session({session, user, token}) {
            session.user = token.user;
            // session.user.username = decodeURIComponent(token.user.username); // Décode le username ici pour l'ensemble de la session
            return session;
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* Le secret dans l'objet authOptions est une clé secrète utilisée pour signer les JSON Web Tokens (JWT) créés par 
NextAuth. Cette clé est utilisée pour crypter et décrypter les tokens d'accès, ce qui permet de vérifier l
'authenticité des utilisateurs et de protéger les données sensibles.

Lorsque NextAuth créé un token d'accès pour un utilisateur, il utilise cette clé secrète pour signer le token. 
Lorsque le token est envoyé à votre application, NextAuth peut utiliser la même clé secrète pour vérifier la 
signature du token et s'assurer qu'il n'a pas été modifié ou falsifié.

En d'autres termes, le secret est utilisé pour garantir l'intégrité et la confidentialité des données 
d'authentification. Il est donc très important de garder cette clé secrète confidentielle et de ne pas la partager 
avec qui que ce soit.

Dans l'exemple de code, le secret est défini comme process.env.NEXTAUTH_SECRET, ce qui signifie que la clé 
secrète est stockée dans une variable d'environnement nommée NEXTAUTH_SECRET. Cela permet de séparer la clé 
secrète du code et de la stocker de manière sécurisée.*/