import { v2 as cloudinary } from "cloudinary";

export async function POST(request) {
  const { public_ids, invalidate } = await request.json();

  if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
    return new Response(JSON.stringify({ error: 'An array of public_ids is required.' }), { status: 400 });
  }

  try {
    const result = await cloudinary.api.delete_resources(public_ids, {
      invalidate: invalidate || true,
    });

    return new Response(JSON.stringify({ message: "Images deleted successfully.", result }), { status: 200 });
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error);
    return new Response(JSON.stringify({ error: 'Error deleting images.' }), { status: 500 });
  }
}