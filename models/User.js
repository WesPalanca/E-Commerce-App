import mongoose from "mongoose";
import { productSchema } from "./Product.js";
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    wishlist: {
        type: [{
            _id: mongoose.Schema.Types.ObjectId,
            productName: String,
            price: Number,
            description: String
        }],
        default: []
    }
}, {collection: "Users"});

const Users = mongoose.model("Users", userSchema);

export default Users;