Je travaille sur un projet next.js 14.2.7 react javascritp avec un routeur App. Mes pages sont en jsx. Et j'utilise Tailwindcss et le router de next/navigation.
  // Vérifier si tous les identifiants sont vides
    const hasValidIds = publicIdArray.some(publicId => publicId !== "");

    if (!hasValidIds) {  
      toast.info("Il n'y a rien à supprimer."); // Message d'information  
      return; // Sortir de la fonction si aucun identifiant valide  
    }
