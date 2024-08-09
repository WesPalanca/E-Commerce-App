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
        const quantityOfBids = await Bid.countDocuments({ product: productId });
        product.currentBid = req.body.amount;
        product.highestBidder = req.user.userId;
        product.quantityOfBids = quantityOfBids;
        await product.save();
        res.status(201).json({success: true, message: "Placed bid"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error});
    }
}

export const getUserBidStatus = async (req, res) =>{
    try{
        const productId = req.query.productId;
        const userId = req.user.userId;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({success: false, message: "couldn't find product"});
        }
        else if(product.highestBidder?.toString() === userId.toString()){
            return res.status(200).json({success: true, message: "You are the highest Bidder!", isHighestBidder: true});
        }
        else{
            return res.status(200).json({success: true, message: "Your are being outbid!", isHighestBidder: false});
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "something went wrong trying to check user bid status"})
    }
}