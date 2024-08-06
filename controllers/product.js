
import Products from "../models/Product.js";
import Users from '../models/User.js';


export const getProducts = async(req, res) =>{
    try{
        const allProducts = await Products.find({});
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


        const products = await Products.find({
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


export const getProduct = async (req, res) =>{
    try{
        const {productId} = req.query;
        let product = await Products.findById(productId);
        if(!product){
           return res.status(404).json({success: false, message: "Couldn't find product"});
        }
        if(product.reviews.length != 0){
            const overallRating = (product.reviews.reduce((sum, review) => sum+=review.rating, 0)/ product.reviews.length).toFixed(1);
            product = await Products.findByIdAndUpdate(
                productId,
            {$set: {overallRating: overallRating}},
            {new: true});
            res.status(200).json({success: true, product, message: "Got product"});
        }
        else{
            product = await Products.findByIdAndUpdate(
                productId,
            {$set: {overallRating: 0}},
            {new: true});
            res.status(200).json({success: true, product, message: "Got Product"})
        }
        
        

    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "something went wrong trying to get product"})
    }
}

export const addReviewToProduct = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const {productId, rating, comment} = req.body;
        if(comment == ""){
            return res.status(400).json({success:false, message: "comment is empty"});
        }
        const user = await Users.findById(userId);
        const username = user.username;
        const reviewTemplate = {
            username: username,
            rating: rating,
            comment: comment
        }
        const product = await Products.findOneAndUpdate(
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