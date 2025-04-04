"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

// This provider component is created separately because it works with a "use client"