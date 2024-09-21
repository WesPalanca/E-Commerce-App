import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';
import heicConvert from 'heic-convert';

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure multer to handle in-memory file uploads
const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage, // Use memory storage for initial processing
}).single('imageUrl'); // Set to 'imageUrl' to match the form input name

const uploadToS3 = async (req, res, next) => {
  try {
      const file = req.file; // Get the file from the request

      let fileName = Date.now().toString() + '.png'; // Change to .png

      if (file.mimetype === 'image/heic' || file.originalname.endsWith('.heic')) {
          const pngBuffer = await heicConvert({
              buffer: file.buffer,
              format: 'PNG',
          });

          await s3.send(new PutObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: fileName,
              Body: pngBuffer,
              ContentType: 'image/png',
          }));

          // Set the location for the image
          const url = `${process.env.S3_BUCKET_URL}/${fileName}`;
          req.file = { location: url};
      } else {
          await s3.send(new PutObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: fileName,
              Body: file.buffer,
              ContentType: file.mimetype,
          }));

          // Set the location for the image
          const url = `${process.env.S3_BUCKET_URL}/${fileName}`;
          req.file = { location: url };
      }

      next(); // Call the next middleware (newProduct)
  } catch (err) {
      console.error("Error uploading image:", err);
      return res.status(500).send({ message: 'Error uploading image', error: err.message });
  }
};


export { upload, uploadToS3 };
