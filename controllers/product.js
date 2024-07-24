import { isValidObjectId } from "mongoose";
import Products from "../models/Product.js";
import Users from '../models/User.js';
import mongoose from "mongoose";
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

export const addToWishList = async (req,res) =>{
    try{
        const userId = req.user.userId;
        const { productId, productName, price, description } = req.body;
        const productTemplate = {
            _id: productId,
            productName: productName,
            price: price,
            description: description
        }
        const addToUser = await Users.findOneAndUpdate(
            {_id: userId},
            {$push: {wishlist: productTemplate}},
            {new: true}
        )

        if (!addToUser){
            return res.status(401).json({success:false, message: "could not update user"});
        }
        res.status(200).json({success: true, message: "updated user successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "error happened while adding product to wishlist"});
    }
}


export const removeFromWishlist = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const { productId } = req.body;
        const user = await Users.findOneAndUpdate({_id: userId},
            {$pull: {wishlist: {_id: productId}}},
            {new: true}
        )
        res.status(200).json({success: true, message: "updated user successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "error happened while removing product from wishlist"})
    }
}

export const checkWishlistStatus = async (req, res) =>{
    try{

        const userId = req.user.userId;
        const { productId } = req.query;
        const user = await Users.findOne({_id: userId});
        const isInWishlist = user.wishlist.some(item => item._id.toString() === productId);
        res.status(200).json({success: true, isInWishlist, message: "status updated"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error});
    }
}

export const getUserWishlist = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const user = await Users.findOne({_id: userId});
        if (!user){
            return res.status(401).json({success: false, message: "Could not find user."});
        }
        const wishlist = user.wishlist;

        res.status(200).json({success: true, message: "got wishlist", wishlist });
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong trying to get wishlist"})
    }
}

export const getUserCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const user = await Users.findOne({_id: userId})
        if (!user){
            return res.status(401).json({success: false, message: "Something went wrong trying to get user cart"})
        }
        const cart = user.cart;
        res.status(200).json({success:true, cart, message: "got cart"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong trying to get wishlist"})
    }
}

export const addToCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const { productId, productName, price, description } = req.body;
        const productTemplate = {
            _id: productId,
            productName: productName,
            price: price,
            description: description
        }
        const addToUser = await Users.findOneAndUpdate(
            {_id: userId},
            {$push: {cart: productTemplate}},
            {new: true}
        )
        res.status(200).json({success: true, message: "added to cart"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong adding to cart"})
    }
}

export const removeFromCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const { productId } = req.body;
        const removeFromUser = await Users.findOneAndUpdate(
            {_id: userId},
            {$pull: {cart: {_id: productId}}},
            {new: true}
        )
        res.status(200).json({success: true, message: "Removed from cart"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong removing from cart"})
    }
}

export const checkCartStatus = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const { productId } = req.query;
        const user = await Users.findOne({_id: userId});
        const isInCart = user.cart.some(item => item._id.toString() === productId);
        res.status(200).json({success: true, isInCart, message: "status updated"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Something went wrong checking cart status"})
    }
}

