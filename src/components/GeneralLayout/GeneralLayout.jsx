"use client";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "../../app/styles/background.css";

export default function GeneralLayout({ children, backgroundImage }) {
  const hasBackgroundImage = !!backgroundImage;
  return (
    <section className="flex flex-col h-screen">
      <Header background={hasBackgroundImage ? "bg-black" : ""} />
      <main
        className="flex-grow"
        style={{ backgroundImage: `url(/background/${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {children}
      </main>
      <Footer background={hasBackgroundImage ? "bg-black" : ""} />
    </section>
  );
}