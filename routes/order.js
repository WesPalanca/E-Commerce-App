import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { placeOrder, bidOrder } from '../controllers/order.js';
const router = express.Router();

router.post('/place', verifyToken, placeOrder);
router.post('/bid-place', verifyToken, bidOrder);


export default router;