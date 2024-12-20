"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";  // Utilisation des hooks appropriés
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import Loading from "@/components/Loading/Loading";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import SocialFrame from "@/components/SocialFrame/SocialFrame";

export default function TestPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const pathname = usePathname(); // Récupérer le chemin actuel
  const searchParams = useSearchParams(); // Récupérer les paramètres de recherche, si nécessaire

  useEffect(() => {
    // Assurez-vous que le code est exécuté uniquement côté client
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      setCurrentUrl(fullUrl);
    }
  }, [pathname, searchParams]);  // Re-déclencher lorsque le chemin ou les paramètres changent

  return (
    <GeneralLayout>
      <p>L'URL actuelle est : {currentUrl}</p>
      <Loading />
      <ImageUpload />
      <SocialFrame />
    </GeneralLayout>
  );
}
