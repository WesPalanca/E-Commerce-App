import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    username: {type: String, required: true},
    rating: {type: Number, required: true},
    title: {type: String, required: false},
    comment: {type: String, required: true}
});

export const productSchema = new mongoose.Schema({
    author: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    isAuctioning: {type: Boolean, required: false, default: false},
    productName: {type: String, required: true},
    price: {type: Number, required: false},
    description: {type: String, required: true},
    quantity: {type: Number, required: false, default: 1},
    amountInStock: {type: Number, required: false, default: 1},
    imageUrl: {type: String, required: false}, 
    // tags: {type: [String], required: false},
    reviews: {type: [reviewSchema], required: false},
    overallRating: {type: Number, required: false},
    startingPrice: {type: Number, default: 0}, 
    currentBid: {type: Number, default: 0}, 
    auctionEnd: {type: Date, required: false}, 
    highestBidder: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    quantityOfBids: {type: Number, default: 0}
}, {collection: "Products"});

const Product = mongoose.model('Product', productSchema);

export default Product