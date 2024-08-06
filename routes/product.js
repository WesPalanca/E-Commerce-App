import { addReviewToProduct, getProduct, getProducts, searchProducts } from '../controllers/product.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

// get and search products
router.get("/products", getProducts);
router.get('/products/search', searchProducts);
router.get('/products/item', getProduct); //api/prod/products/item
router.post('/item/reviews', verifyToken, addReviewToProduct); //api/prod/item/review











export default router;