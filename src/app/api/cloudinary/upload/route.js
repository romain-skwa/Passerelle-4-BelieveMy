// pages/api/upload.js
import cloudinary from 'cloudinary';
import { parse } from 'path';
import { writeFileSync, unlinkSync } from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const fileBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });

    const contentDisposition = req.headers['content-disposition'];
    if (!contentDisposition) {
      return res.status(400).json({ error: 'Content-Disposition header is missing' });
    }

    const fileName = parse(contentDisposition).name;
    const filePath = join('/tmp', fileName);
    writeFileSync(filePath, fileBuffer);

    try {
      const result = await cloudinary.v2.uploader.upload(filePath, {});
      unlinkSync(filePath); // Supprimer le fichier temporaire après le téléchargement
      res.status(200).json(result);
    } catch (error) {
      unlinkSync(filePath); // Supprimer le fichier temporaire en cas d'erreur
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}