import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserBidStatus, placeBid } from "../controllers/bid.js";
const router = express.Router();


router.post('/place', verifyToken, placeBid);

router.get('/status', verifyToken, getUserBidStatus);


export default router;