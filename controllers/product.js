import Products from "../models/Product.js";

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