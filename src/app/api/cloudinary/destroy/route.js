import { v2 as cloudinary } from "cloudinary";

// Configurer Cloudinary avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Fonction pour gérer les requêtes POST
export async function POST(request) {
  const { public_id, invalidate } = await request.json();

  if (!public_id) {
    return new Response(JSON.stringify({ error: 'Le paramètre public_id est requis.' }), { status: 400 });
  }

  try {
    // Supprimer l'image à partir du public_id
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: invalidate || false, // Optionnel : invalider le cache de Cloudinary
    });

    // Vérifier si l'image a été supprimée
    if (result.result === "ok") {
      return new Response(JSON.stringify({ message: "Image supprimée avec succès.", result }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Échec de la suppression de l\'image' }), { status: 500 });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image Cloudinary:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression de l\'image.' }), { status: 500 });
  }
}