import { addToCart, checkCartStatus, getCartTotal, getQuantityInCart, getUserCart, removeFromCart} from '../controllers/cart.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();



router.post('/update', verifyToken, addToCart);
router.delete('/update', verifyToken, removeFromCart);
router.get('/user',verifyToken, getUserCart);
router.get('/status',verifyToken, checkCartStatus);
router.get('/total', verifyToken, getCartTotal); //api/cart/total
router.get('/quantity',verifyToken, getQuantityInCart); //api/cart/quantity


export default router;