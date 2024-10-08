import User from "../models/User.js";

export const getUserCart = async(req,res) =>{
    try{
        const userId = req.user.userId;
        const user = await User.findOne({_id: userId})
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
      if (quantity === null || quantity === undefined){
        return res.status(400).json({success: false, message: "invalid quantity"});
      }
      const user = await User.findById(userId);
      if(!user) return res.status(404).json({success: false, message: "could not find user"});

      const inCart = user.cart.find(item => item._id.toString() === productId);

      if(inCart) return res.status(400).json({success: false, message: "Product already in cart"});

      const productTemplate = {
        _id: productId,
        productName: productName,
        price: price,
        description: description,
        imageUrl: imageUrl,
        quantity: quantity
      };
      await User.findOneAndUpdate(
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
        const { productId } = req.body;
        await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {cart: { _id: productId }}},
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
        const user = await User.findOne({_id: userId});
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
        const user = await User.findOne({_id: userId});
        if(!user){
            return res.status(404).json({success: false, message: "Couldn't find user"}) 
        }
        const cartTotal = parseFloat(user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
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
        const user = await User.findOne({_id: userId});
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