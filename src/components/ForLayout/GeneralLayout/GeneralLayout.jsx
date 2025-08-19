"use client";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "@/app/styles/background.css";

export default function GeneralLayout({ children, backgroundImage }) {
  const hasBackgroundImage = !!backgroundImage;
  const mainStyle = hasBackgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        boxShadow: hasBackgroundImage
          ? "inset 0px -5px 10px black, inset 0px 10px 15px black"
          : "none",
      }
    : {};

  return (
    <section className="flex flex-col h-screen content">
      <Header background={hasBackgroundImage ? "bg-black" : ""} />
      <main className="flex-grow tablet:pt-2 pb-6" style={mainStyle}>
        {children}
      </main>
        <Footer background={hasBackgroundImage ? "bg-black" : ""} />
      </section>
  );
}
