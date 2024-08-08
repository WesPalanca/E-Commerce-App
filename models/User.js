import mongoose from "mongoose";
import { productSchema } from "./Product.js";
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    wishlist: {
        type: [productSchema],
        default: []
    },
    cart: {
        type: [productSchema],
        default: []
    }
}, {collection: "User"});

const User = mongoose.model("User", userSchema);

export default User;