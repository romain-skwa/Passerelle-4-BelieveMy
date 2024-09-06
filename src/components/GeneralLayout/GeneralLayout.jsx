"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useSession } from "next-auth/react";

export default function GeneralLayout({ children }) {
  // Variables
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  return (
    <section className="flex flex-col h-screen">
      <Header />
      {session?.user?.email ? (
        <div>L'utilisateur est maintenant CONNECTE</div>
      ) : (
        <div>L'utilisateur n'est pas connecté</div>
      )}
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
