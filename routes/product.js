import { addReviewToProduct, fetchAuthorListings, getProduct, getProducts, newProduct, searchProducts } from '../controllers/product.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

// get and search products
router.get("/products", getProducts);
router.get('/products/search', searchProducts);
router.get('/products/item', getProduct); //api/prod/products/item
router.post('/item/reviews', verifyToken, addReviewToProduct); //api/prod/item/review
router.post('/products/new', verifyToken, newProduct); //api/prod/products/new
router.get('/author-listings', fetchAuthorListings); //api/prod/author-listings











export default router;