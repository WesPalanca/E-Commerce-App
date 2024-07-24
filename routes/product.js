import { addToWishList, checkWishlistStatus, getProducts, getUserWishlist, removeFromWishlist, searchProducts } from '../controllers/product.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.get("/products", getProducts);

router.get('/products/search', searchProducts);

router.post('/products/wishlist', verifyToken, addToWishList); //prod/products/wishlist

router.get('/products/wishlist/status', verifyToken, checkWishlistStatus);

router.delete('/products/wishlist', verifyToken, removeFromWishlist);

router.get('/products/wishlist', verifyToken, getUserWishlist);









export default router;