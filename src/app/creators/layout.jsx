"use client";

import Footer from "@/components/ForLayout/Footer/Footer";
import Header from "@/components/ForLayout/Header/Header";
export default function creatorLayout({ children }) {
  return (
    <>
      <video
        src="/background/cyberPunkLiveWallpaper.mp4"
        autoPlay
        loop
        muted
        className="video"
      />
      {/* J'ai enlevé le Header et le Footer ici. Est-ce vraiment comment ceci qu'il faut procéder ? 
        Avant de fixer la position du live Wallpaper, je voyais l'arrière plan commun à l'ensemble du site. */}
      <main className="flex-grow pt-6 pb-6 content">{children}</main>
      {/* Même sans ajouter "content" dans les classes, les données tapées dans background.css étaient fonctionnelles.*/}
    </>
  );
}
