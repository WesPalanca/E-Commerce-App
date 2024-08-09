import User from '../models/User.js';
import Order from '../models/Order.js';
import sendEmail from './emailService.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { cart, total } = req.body;

        // Ensure that cart is an array of objects conforming to detailSchema
        const orderDetails = cart.map(product => ({
            productName: product.productName,
            price: product.price,
            quantity: product.quantity
        }));

        // Create and save the order
        const order = new Order({
            user: userId,
            orderDetails: orderDetails,
            total: total
        });
        await order.save();

        // Retrieve user and send confirmation email
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { email, username, firstName, lastName } = user;

        // HTML email body
        const subject = "Order Confirmation";
        const text = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                    h1 { color: #333; }
                    .order-details { margin-top: 20px; }
                    .order-details table { width: 100%; border-collapse: collapse; }
                    .order-details th, .order-details td { border: 1px solid #ddd; padding: 8px; }
                    .order-details th { background-color: #f4f4f4; }
                    .total { margin-top: 20px; font-size: 18px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Thank you for your order, ${username}!</h1>
                    <p>Here are the details of your recent purchase:</p>
                    <div class="order-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderDetails.map(item => `
                                    <tr>
                                        <td>${item.productName}</td>
                                        <td>$${item.price.toFixed(2)}</td>
                                        <td>${item.quantity}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="total">
                        Total: $${total.toFixed(2)}
                    </div>
                    <p>Thank you for shopping with us!</p>
                    <p>Best regards,<br>Your Company</p>
                </div>
            </body>
            </html>
        `;

        await sendEmail(email, subject, text);
        user.cart = [];

        await user.save();
        res.status(200).json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Something went wrong while placing the order" });
    }
};
