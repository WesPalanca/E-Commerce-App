import User from "../models/User.js";
export const addToWishList = async (req,res) =>{
    try{
        const userId = req.user.userId;
        const { productId, productName, price, description, imageUrl } = req.body;
        const productTemplate = {
            _id: productId,
            productName: productName,
            price: price,
            description: description,
            imageUrl: imageUrl
        }
        const addToUser = await User.findOneAndUpdate(
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
        const user = await User.findOneAndUpdate({_id: userId},
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
        const user = await User.findOne({_id: userId});
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
        const user = await User.findOne({_id: userId});
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
