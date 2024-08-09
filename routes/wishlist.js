import { addToWishList, checkWishlistStatus, getUserWishlist, removeFromWishlist, } from '../controllers/wishlist.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();


// get wishlist, add to wishlist, remove from wishlist, check wishlist status
router.get('/status', verifyToken, checkWishlistStatus);
router.get('/wishlist', verifyToken, getUserWishlist);
router.post('/wishlist', verifyToken, addToWishList); //api/wish/wishlist
router.delete('/wishlist', verifyToken, removeFromWishlist);



export default router;