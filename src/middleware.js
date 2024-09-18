import { NextResponse } from "next/server";

// middleware.js create one file to check if the user is logged in
export function middleware(request) {

    let isAuthenticated =  false; // Par défaut, c'est false.

    if(!isAuthenticated) { // Quand c'est le contraire de false, c'est true. Donc :
        const url = request.nextUrl.clone(); // On clone l'url qui arrive
        url.pathname = "/"; // Et on va remplacer le pathname par / (la page d'accueil)
        return NextResponse.redirect(url); // Et on redirige
    }

    return NextResponse.next();
}

    // ATTENTION. Avec les lignes ci-dessus, il y a une boucle infinie parce que la redirection se fait même quand on arrive sur /login.
    // Pour palier à ce problème, il faut exporter la configuration.

    export const config = {
        matcher: ["/private-page", "/autre-page-restreinte"], // matcher est utilisé pour spécifier les URL qui doivent être prises en compte par la configuration de routage international définie dans l'objet config.
        // Ici, ce sont les pages censées être inaccessibles aux utilisateurs non connectés
    }

/*
    Note pour moi : ici impossible d'utiliser Router.push ou router.replace car next/navigation s'exécute au niveau du client
    Hors, le middleware s'exécutera toujours au niveau du serveur.

    import { useRouter } from "next/navigation";

    export function middleware(request) {
        const router = useRouter();
        router.push('/login');
    }

    Ici, on va profiter de la requête (request) pour rediriger l'utilisateur.
    On va modifier la prochaine Url.
*/