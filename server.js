import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import prodRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import wishRoutes from './routes/wishlist.js';

dotenv.config();
const app = express();
const allowedOrigins = process.env.VITE_IP ? [process.env.VITE_IP] : ['http://localhost:5173'];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
mongoose.connect(process.env.MONGO_URI,{
    dbName: "ShopWP"
})
.then(console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to database " + error));

app.use('/api/auth', authRoutes);
app.use('/api/prod', prodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wish', wishRoutes);

const PORT = process.env.PORT;

app.listen(PORT || 3000, '0.0.0.0', () =>{
    console.log('listening on port ' + PORT);
})
