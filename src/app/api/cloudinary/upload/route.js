import { v2 as cloudinary } from 'cloudinary';

// Configurer Cloudinary avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.file;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'un_preset_non_signe'
      });
      res.status(200).json(uploadResponse);
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}