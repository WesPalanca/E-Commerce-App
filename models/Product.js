import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    rating: {type: Number, required: true},
    title: {type: String, required: false}, //change to true later
    comment: {type: String, required: true}
});

export const productSchema = new mongoose.Schema({
    isAuctioning: {type: Boolean, required: false, default: false},
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: false, default: 0},
    imageUrl: {type: String, required: false}, //change to to true later
    tags: {type: Array, required: false},
    reviews: {type: [reviewSchema], required: false},
    overallRating: {type: Number, required: false},
    startingPrice: {type: Number, default: 0}, //change to true later
    currentBid: {type: Number, default: 0}, 
    auctionEnd: {type: Date, required: false}, //change to true later
    highestBidder: {type: mongoose.Types.ObjectId, ref: "User"},
    quantityOfBids: {type: Number, default: 0}
}, {collection: "Products"});

const Product = mongoose.model('Product', productSchema);

export default Product