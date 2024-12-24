"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ConnectedUser() {
    const { data: session } = useSession();
    const username = session?.user.username;
    const encodedUsername = encodeURIComponent(username);

    return  (
    session?.user?.email ? (        
    <div className="text-white">
      <Link href={`dynamic/profilecreators/@${encodedUsername}`}>
        {session?.user.username}
      </Link> est maintenant CONNECTE
    </div>
  ) : (
    <div className="text-white">L'utilisateur n'est pas connecté</div>
  )
);}
