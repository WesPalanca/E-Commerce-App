import { getProducts, searchProducts } from '../controllers/product.js';
import express from 'express';
const router = express.Router();

// get and search products
router.get("/products", getProducts);
router.get('/products/search', searchProducts);











export default router;