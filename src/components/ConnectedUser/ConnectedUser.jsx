"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ConnectedUser() {
    const { data: session } = useSession();
    
  return  (
    session?.user?.email ? (        
    <div className="text-white"><Link href={`dynamic/profilecreators/@${session?.user.username}`}>{decodeURIComponent(session?.user.username)}</Link> est maintenant CONNECTE</div>
  ) : (
    <div className="text-white">L'utilisateur n'est pas connecté</div>
  )
);}