import cron from "node-cron";
import sendEmail from '../controllers/emailService.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

cron.schedule
cron.schedule('* * * * *', async () => {
    console.log('Checking for ended auctions...');
    const now = new Date();

    try {
        // Find products where isAuctioning is true and auctionEnd is less than or equal to now
        const endedAuctions = await Product.find({
            isAuctioning: true,
            auctionEnd: { $lte: now }
        });

        console.log(`Found ${endedAuctions.length} ended auctions.`);

        for (const product of endedAuctions) {
            // Mark auction as ended by setting isAuctioning to false
            await Product.updateOne({ _id: product._id }, { isAuctioning: false });
            console.log(`Auction ended for product ${product._id}.`);

            // Find the highest bidder
            const highestBidder = await User.findById(product.highestBidder);

            if (highestBidder) {
                const email = highestBidder.email;
                const subject = "You won the auction!";
                const html =
                `<html>
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
                  You won ${product.productName} with a bid of ${product.currentBid}
                  <a href="http://localhost:5173/Checkout/${product._id}">click here to claim your product.</a>
                </body>
                </html>
            `;
                // Using async function to avoid blocking
                await sendEmail(email, subject, html);
                console.log(`Email sent to ${email}.`);
            }
        }

        console.log('Auction check complete');
    } catch (error) {
        console.error('Error checking auctions:', error);
    }
});
