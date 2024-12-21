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
        className="flex-grow pt-6 pb-6"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: hasBackgroundImage 
            ? "inset 0px -5px 10px black, inset 0px 10px 15px black" 
            : "none",
        }}
      >
        {children}
      </main>
      <Footer background={hasBackgroundImage ? "bg-black" : ""} />
    </section>
  );
}
