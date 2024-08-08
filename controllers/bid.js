import Bid from '../models/Bid.js';
import Product from '../models/Product.js';

export const placeBid = async (req, res) => {
    try{
        const productId = req.body.productId;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({success: false, message: "Product not found."});
        if (new Date() > new Date(product.auctionEnd)){
            return res.status(400).send("Auction has ended");
        }
        if (req.body.amount <= product.currentBid){
            return res.status(400).send("Bid amount must be higher than the current bid.");
        }
        
        const bid = new Bid({
            product: productId,
            user: req.user.userId,
            amount: req.body.amount
        });
        await bid.save();
        product.currentBid = req.body.amount;
        product.highestBidder = req.user.userId;
        await product.save();
        res.status(201).json({success: true, message: "Placed bid"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error});
    }
}