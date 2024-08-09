import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import {Server} from "socket.io";
import authRoutes from './routes/auth.js';
import prodRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import wishRoutes from './routes/wishlist.js';
import bidRoutes from './routes/bid.js';
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
    }
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));
mongoose.connect(process.env.MONGO_URI,{
    dbName: "ShopWP"
})
.then(console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to database " + error));

app.use('/api/auth', authRoutes);
app.use('/api/prod', prodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wish', wishRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/order', orderRoutes);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('newBid', (data) => {
        console.log("New bid: " + data);
        io.emit("newBid", data);
    });
    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})

const PORT = process.env.PORT;

server.listen(PORT || 3000, () =>{
    console.log('listening on port ' + PORT);
})
