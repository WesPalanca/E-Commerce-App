import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { placeBid } from "../controllers/bid.js";
const router = express.Router();


router.post('/place', verifyToken, placeBid);


export default router;