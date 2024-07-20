import { getProducts } from '../controllers/product.js';
import express from 'express';
const router = express.Router();

router.get("/products", getProducts);










export default router;