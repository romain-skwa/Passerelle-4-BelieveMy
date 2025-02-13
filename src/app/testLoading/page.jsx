"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import SocialFrame from "@/components/SocialFrame/SocialFrame";

export default function TestPage() {
  const router = useRouter();
const [onchangeCouleur, setOnchangeCouleur] = useState("bg-blue-600");
  const encore = () => {
    console.log("handleBeforeUnload s'ouvre.");
    setOnchangeCouleur("bg-lime-600");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Affiche la fenêtre de confirmation
      encore(); // Exécute la fonction avant le rechargement
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  return (
    <GeneralLayout>
      <Loading />
      <ImageUpload />
      <section className={`w-full h-80 ${onchangeCouleur}`}></section>
      <SocialFrame />
    </GeneralLayout>
  );
}
