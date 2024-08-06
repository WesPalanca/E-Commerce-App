import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    uniqueId: {type: mongoose.Types.ObjectId, required: false},
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: false}, //change to to true later
    tags: {type: Array, required: false},
    reviews: {type: Array, required: false},
    overallRating: {type: Number, required: false},
    quantity: {type: Number, required: false, default: 0},
    amountInStock: {type: Number, required: false, default: 5}
}, {collection: "Products"});

const Products = mongoose.model('Products', productSchema);

export default Products