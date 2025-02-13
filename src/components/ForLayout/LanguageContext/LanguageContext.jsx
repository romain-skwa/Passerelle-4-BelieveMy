"use client"
import { usePathname } from 'next/navigation';
// LanguageContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Valeur par défaut
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userLanguages = navigator.languages || [navigator.language]; // Récupère les langues préférées

    // Vérifie si la première langue est française ou un de ses dérivés
    const firstLanguage = userLanguages[0];
    const isFrenchPreferred = firstLanguage.startsWith('fr');

    // Détermine la langue détectée
    const detectedLanguage = isFrenchPreferred ? 'fr' : firstLanguage;

    setLanguage(detectedLanguage);
  }, []);

  // Définir la fonction changeLanguage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  /***************************************************************************************************************/
  /************* Delete all images when user leave this page without submit the formulary - Part 2 ***************/
  const [publicIdArray, setPublicIdArray] = useState([]);
  const publicIdArrayRef = useRef([]);
  const [shouldDeleteAllImages, setShouldDeleteAllImages] = useState(false);
  const [isUrlContent, setIsUrlContent] = useState(false);

  console.log(`[Contexte] Où en est Suppression : `, shouldDeleteAllImages);
  console.log(`[Contexte] Est-ce que les données URL contiennent quelque chose ? `, isUrlContent);

  // useEffect pour mettre à jour shouldDeleteAllImages
  useEffect(() => {
    if (pathname === '/creators/introductionGameForm') {
      setShouldDeleteAllImages(true);
    } // It will be "false" only in the function onPrepare, in the component introductionGameForm.
  }, [pathname]);  

  useEffect(() => {
    publicIdArrayRef.current = publicIdArray;  
  }, [publicIdArray]);

  useEffect(() => {
    console.log(`[Contexte] Dans le contexte, on peut voir publicIdArray : `, publicIdArray);
  }, [publicIdArray]);

  console.log(`[Contexte] Pathname dans le contexte : `, pathname);
    /*********** Suppression automatique des images de introductionGameForm ************************ */
    const handleDeleteAllImages = async () => {
      console.log(`Au moment où handleDeleteAllImages vient d'être lancé, publicIdArray : `, publicIdArray);

      let deleteSuccess = true;
  
      for (const publicId of publicIdArrayRef.current) {
        console.log("On lance la boucle publicId");
        if (publicId) { // When data !empty handleDeleteImage delete the image
          const success = await handleDeleteImage(publicId);
          if (!success) {
            deleteSuccess = false; // Si une suppression échoue, mettre à jour la variable
            console.log("Il y a un problème dans la boucle publicId");
          }
        }
      }
  
      // Afficher un message de toast
      if (deleteSuccess) {
        toast.success("Toutes les images ont été supprimées avec succès !");
      } else {
        toast.error("Une ou plusieurs images n'ont pas pu être supprimées.");
      }
    };
  
    const handleDeleteImage = async (publicId) => {
      if (publicId) {
        console.log(
          `La suppression est lancée. On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`
        );
        try {
          const response = await fetch("/api/cloudinary/destroy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: publicId, invalidate: true }),
          });
  
          const result = await response.json();
          if (response.ok) {
            console.log("Image supprimée de Cloudinary :", result);
            return true; // Indiquer que la suppression a réussi
          } else {
            console.error(
              "Erreur lors de la suppression de l'image :",
              result.error
            );
            return false; // Indiquer que la suppression a échoué
          }
        } catch (error) {
          console.error("Error deleting image:", error);
          return false; // Indiquer que la suppression a échoué
        }
      } else {
        console.log("On dirait qu'il n'y a pas de publicId à supprimer.");
        return false; // Indiquer que la suppression a échoué
      }
    };      
    
    // Quand on clique sur un bouton pour aller sur une autre page
    const handleLinkClick = (event) => {
      if (!confirm("Êtes-vous sûr de vouloir quitter cette page ?")) {
        event.preventDefault(); // Empêche la navigation si l'utilisateur annule
        console.log("On reste sur la page");
      } else {
        console.log("On supprime les images de la base de données de Cloudinary parce que le formulaire n'a pas été soumis.");
      }
    };
    /******************* Quand on clique sur un lien pour quitter la page ***********************/
    // Vérification ! Supprime-t-on les images ou non ?
    useEffect(() => {
      console.log(`Dans le useEffect des vérifications, shouldDeleteAllImages : `, shouldDeleteAllImages);
      console.log(`Dans le useEffect des vérifications, pathname : `, pathname);
      console.log(`Dans le useEffect des vérifications, isUrlContent : `, isUrlContent);
      console.log("[0] On vérifie les conditions...");
      if(shouldDeleteAllImages === true && pathname !== '/creators/introductionGameForm' && isUrlContent){
        console.log("[1] Les trois conditions sont remplies. On va tenter de supprimer les images de la base de données de Cloudinary");
        handleDeleteAllImages();
        } else if (shouldDeleteAllImages === true && pathname !== '/creators/introductionGameForm' && !isUrlContent){
          console.log("[2] On quitte la page mais les données URL ne contenaient rien");
        } else if (shouldDeleteAllImages === false && pathname !== '/creators/introductionGameForm' && isUrlContent){
          console.log("[3] Le formulaire a été envoyé.")
        }
    }, [pathname])
    
/************************************************************************* */

  return (
    <LanguageContext.Provider value={{ 
      language,
      setLanguage,
      changeLanguage, 
      setPublicIdArray, 
      setShouldDeleteAllImages,
      setIsUrlContent,
      isUrlContent,
      shouldDeleteAllImages,
      handleLinkClick,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};