# Wes Shop

## Tech Stack

Used the MERN stack for the basic e-commerce app functionality; selling, saving, and buying products. SocketIO for real time bidding. AWS S3 buckets for saving and accessing images.

## Challenges

One of the biggest challenges I faced when building this project was image uploading using AWS S3 buckets for selling products. At first I thought about using plain multer to store and server the images locally. However I wanted to practice using a technology that would be scalable for a larger purpose. This was difficult at first, going through trial and error figuring out the CORS configuration, bucket policies, and image format.

## How to run

frontend
npm run dev
backend
node server.js
