import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
}, {collection: "Products"});

const Products = mongoose.model('Products', productSchema);

export default Products;