
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


