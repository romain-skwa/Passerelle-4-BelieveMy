// DESTROY one image already used when user call the widget to replace it.
// UpdateIntro.jsx
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Function to handle POST requests
export async function POST(request) {
  const { public_id, invalidate } = await request.json();
  console.log(`public_id dans l'API Destroy : `, public_id);

  if (!public_id) {
    return new Response(JSON.stringify({ error: 'Le paramètre public_id est requis.' }), { status: 400 });
  }

  try {
    // Remove image from public_id
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: invalidate || true, // Optionnel : invalider le cache de Cloudinary
    });

    console.log(`result dans l'API Destroy : `, result);
    // Check if the image has been deleted
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
