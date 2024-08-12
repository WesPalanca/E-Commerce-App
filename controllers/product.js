
import Product from "../models/Product.js";
import User from '../models/User.js';
import Bid from "../models/Bid.js";
import mongoose from "mongoose";

export const getProducts = async(req, res) =>{
    try{
        const allProducts = await Product.find({
            $or: [
                { auctionEnd: { $gt: new Date() } },  // Auction end time is in the future
                { auctionEnd: { $exists: false } }    // Auction end time does not exist
            ],
            amountInStock: { $gt: 0 }
        })
        res.status(200).json({success: true, allProducts, message: "Products fetched successfully"});
    }
    catch(error){
        console.log('Error fetching products');
        res.status(500).json({success: false, message: "Error while fetching products " + error});
    }
}


export const searchProducts = async(req, res) => {
    try{
        const { query } = req.query;


        const products = await Product.find({
            productName: {$regex: query, $options: "i"},
        });
        if(products.length > 0){
            return res.status(200).json({message: "found products", products, success: true})
        }
        else{
            return res.status(404).json({message: "Product not found", success: false});
        }
    }
    catch(error){
        console.log("Error fetching specific product");
        res.status(500).json({success: false, message: `Error while fetching specific products ${error}`});
    }
}


export const getProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Couldn't find product" });
        }

        const quantityOfBids = await Bid.countDocuments({ product: productId });
        const updateData = { quantityOfBids: quantityOfBids };

        if (product.reviews.length !== 0) {
            const overallRating = (product.reviews.reduce((sum, review) => sum += review.rating, 0) / product.reviews.length).toFixed(1);
            updateData.overallRating = overallRating;
        }

        await Product.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true }
        );

        res.status(200).json({ success: true, product, message: "Got product" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong trying to get product" });
    }
}


export const addReviewToProduct = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const {productId, rating, comment} = req.body;
        if(comment == ""){
            return res.status(400).json({success:false, message: "comment is empty"});
        }
        const user = await User.findById(userId);
        const username = user.username;
        const reviewTemplate = {
            username: username,
            rating: rating,
            comment: comment
        }
        await Product.findOneAndUpdate(
            { _id: productId },
            { $push: {reviews: reviewTemplate}},
            { new: true}
        );

    
        res.status(200).json({success:true, message: "added review"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Soemting went wrong trying to add a review to product"})
    }
}