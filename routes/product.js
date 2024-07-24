import { addToCart, addToWishList, checkCartStatus, checkWishlistStatus, getProducts, getUserCart, getUserWishlist, removeFromCart, removeFromWishlist, searchProducts } from '../controllers/product.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

// get and search products
router.get("/products", getProducts);
router.get('/products/search', searchProducts);

// get wishlist, add to wishlist, remove from wishlist, check wishlist status
router.post('/products/wishlist', verifyToken, addToWishList); //prod/products/wishlist
router.get('/products/wishlist/status', verifyToken, checkWishlistStatus);
router.delete('/products/wishlist', verifyToken, removeFromWishlist);
router.get('/products/wishlist', verifyToken, getUserWishlist);

// get cart, add to cart, remove from cart, check cart status
router.post('/products/cart', verifyToken, addToCart);
router.delete('/products/cart', verifyToken, removeFromCart);
router.get('/products/cart/',verifyToken, getUserCart);
router.get('/products/cart/status',verifyToken, checkCartStatus);









export default router;