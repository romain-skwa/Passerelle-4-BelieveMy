"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GeneralLayout({ children }) {
  // Variables
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  return (
    <section className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-sky-900">      
        {session?.user?.email ? (        
        <div><Link href={`dynamic/profilecreators/@${session?.user.username}`}>{session?.user.username}</Link> est maintenant CONNECTE</div>
      ) : (
        <div>L'utilisateur n'est pas connecté</div>
      )}
      {children}
      </main>
      <Footer />
    </section>
  );
}
