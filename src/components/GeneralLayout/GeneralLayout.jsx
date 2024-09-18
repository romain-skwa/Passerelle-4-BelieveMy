"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "../../app/styles/background.css";

export default function GeneralLayout({ children }) {
  // Variables
  const pathname = usePathname();

  return (
    <section className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}
