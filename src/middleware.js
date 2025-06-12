/*import { hasCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
*/
/*
// middleware.js create one file to check if the user is logged in
export async function middleware(request) {
  //let isAuthenticated =  false; // Par défaut, c'est false.

  // Check if connected
  
  const isAuthenticated = await hasCookie("__Secure-next-auth.session-token", {
    req: request,
  });
    const session = await getServerSession(request);
    const isAuthenticated = session;

  console.log(`isAuthenticated `, isAuthenticated);
  console.log(`url :  `, request.nextUrl);
  if (!isAuthenticated) {
    // Quand c'est le contraire de false, c'est true. Donc :
    const url = request.nextUrl.clone(); // On clone l'url qui arrive
    url.pathname = "/creators/login"; // Et on va remplacer le pathname par / (la page d'accueil)
    return NextResponse.redirect(url); // Et on redirige
  }

  return NextResponse.next();
}
*/
// ATTENTION. Avec les lignes ci-dessus, il y a une boucle infinie parce que la redirection se fait même quand on arrive sur /login.
// Pour palier à ce problème, il faut exporter la configuration.
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/creators/introduceYourselfForm",
    "/creators/introduceGameForm",
    "/dynamic/resetPassword", // Pourquoi ça marche encore alors que j'ai ajouté cette page sur la liste ?
    "/listOfYouGames",
  ], // matcher est utilisé pour spécifier les URL qui doivent être prises en compte par la configuration de routage international définie dans l'objet config.
  // Ici, ce sont les pages censées être inaccessibles aux utilisateurs non connectés
};
