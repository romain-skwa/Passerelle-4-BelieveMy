"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

// Ce composant provider est créé à part parcequ'il fonctionne avec un "use client"