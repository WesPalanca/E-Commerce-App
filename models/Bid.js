import mongoose from "mongoose";


const bidSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    amount: {type: Number, required: true},
    bidTime: {type: Date, default: Date.now}

}, {collection: "Bid"});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;