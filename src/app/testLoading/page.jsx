"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import SocialFrame from "@/components/SocialFrame/SocialFrame";

export default function TestPage() {
  const pathname = usePathname();
  const [suppression, setSuppression] = useState(false);
  console.log(`Où en est Suppression : `, suppression);

  useEffect(() => {
    // Exécute cette logique uniquement si suppression est true
    if (suppression) {
      return () => {
        console.log("Vous quittez la page :", pathname);
        alert("Vous quittez la page :", pathname);
      };
    }
  }, [suppression, pathname]); // Dépendance sur suppression et pathname

  useEffect(() => {
    // Mettre suppression à true après le premier rendu
    setSuppression(true);
  }, []);

  return (
    <GeneralLayout>
      <Loading />
      <ImageUpload />
      <SocialFrame />
    </GeneralLayout>
  );
}

