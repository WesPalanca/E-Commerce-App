import Users from "../models/User.js";
import Products from "../models/Product.js";
import mongoose from "mongoose";

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

export const addToCart = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId, productName, price, description, imageUrl, quantity } = req.body;
      const productTemplate = {
        _id: productId,
        uniqueId: new mongoose.Types.ObjectId(),
        productName: productName,
        price: price,
        description: description,
        imageUrl: imageUrl,
        quantity: quantity
      };
      const addToUser = await Users.findOneAndUpdate(
        { _id: userId },
        { $push: { cart: productTemplate } },
        { new: true }
      );
      res.status(200).json({ success: true, message: "added to cart" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Something went wrong adding to cart" });
    }
  };
  

export const removeFromCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const { uniqueId } = req.body;
        console.log(uniqueId);
        const removeFromUser = await Users.findOneAndUpdate(
            {_id: userId},
            {$pull: {cart: { uniqueId: uniqueId }}},
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

export const getCartTotal = async (req, res) =>{
    try{
        const userId = req.user.userId;
        const user = await Users.findOne({_id: userId});
        if(!user){
            return res.status(404).json({success: false, message: "Couldn't find user"}) 
        }
        const cartTotal = parseFloat(user.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
        res.status(200).json({success: true, cartTotal, message: "got total"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "something went wrong getting cart total"});
    }
}

export const getQuantityInCart = async (req,res) =>{
    try{
        const userId = req.user.userId;
        const user = await Users.findOne({_id: userId});
        if(!user){
            res.status(404).json({success: false, message: "couldn't find user"});
        }
        const quantity = user.cart.length;
        res.status(200).json({success:true, quantity, message: "got quantity"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "something went wrong getting cart quantity"});
    }
}