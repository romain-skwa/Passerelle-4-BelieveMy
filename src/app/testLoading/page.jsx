"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";  
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import Loading from "@/components/Loading/Loading";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import TextOneByOne from "@/components/TextOneByOne/TextOneByOne";

export default function TestPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      setCurrentUrl(fullUrl);
    }
  }, [pathname, searchParams]);

  const testEmail = async () => {
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'nostromo_site@yahoo.fr',
          subject: 'Test Email',
          text: 'Ceci est un test.',
        }),
      });
  
      // Vérifie le statut de la réponse
      if (!response.ok) {
        const errorText = await response.text(); // Récupère le texte brut de la réponse
        console.error('Erreur lors de l\'envoi de l\'email:', errorText);
        return;
      }
  
      const data = await response.json();
      if (data.success) {
        console.log('E-mail envoyé avec succès');
      } else {
        console.error('Erreur lors de l\'envoi de l\'email:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  };

  useEffect(() => {
    testEmail();
  }, []);

  return (
    <GeneralLayout>
      <p>L'URL actuelle est : {currentUrl}</p>
      <TextOneByOne />
      <Loading />
      <ImageUpload />
      <SocialFrame />
    </GeneralLayout>
  );
}