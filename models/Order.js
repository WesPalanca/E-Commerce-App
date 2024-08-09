import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}

})

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orderDetails: {type: [detailSchema], required: true},
    total: {type: Number, required: true},
    orderTime: {type: Date, default: Date.now}
},{collection: "Order"})



const Order = mongoose.model("Order", orderSchema)
export default Order;