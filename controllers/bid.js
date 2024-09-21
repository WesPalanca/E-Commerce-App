import Bid from '../models/Bid.js';
import Product from '../models/Product.js';

/**
 * Places bid on current auctioning product.
 * @function
 * @async
 * @param {Object} req - Incoming request object containing the product's ID.
 * @param {Object} res - Response that gives feedback to the client.
 * @returns {Promise<void>} - A promise that resolves when the bid is successfully placed.
 * @description
 * - Returns 404 status if product cannot be found, 400 if the auction has already ended or the bid is smaller than the current bid.
 * - Records the bid in the Bid collection.
 * - Updates the current bid amount, the highest bidder, and amount of bids on the product.
 */

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

/**
 * Gets the user's status on the auction of the product.
 * @function
 * @async
 * @param {Object} req - Incoming request that contains the products ID.
 * @param {Object} res - Response to the client that gives feedback on the users status on the product.
 * @returns {Promise<void>} - Promise resolves when the user successfully receives feedback on bidder status.
 * 
 */
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