import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [showCartedMessage, setShowCartedMessage] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });
  const [quantity, setQuantity] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/prod/products/item`, {
        params: { productId: id },
      });
      const { success, product, message } = response.data;

      if (success) {
        setProduct(product);
        setOverallRating(product.overallRating);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log("Error fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const handleNewBid = (data) => {
      console.log("New bid received: ", data);
      fetchProduct(); // Refresh product to reflect new bid
    };

    socket.on('newBid', handleNewBid);

    return () => {
      socket.off('newBid', handleNewBid);
    };
  }, []);

  const handleBid = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/bid/place`,
        { productId: id, amount: bidAmount },
        { headers: { Authorization: token } }
      );
      const { success, message } = response.data;
      if (success) {
        console.log(message);
        socket.emit("newBid", { productId: id, amount: bidAmount });  
      }
    } catch (error) {
      console.log("Error placing bid", error);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/prod/item/reviews`,
        {
          productId: id,
          rating: parseFloat(reviewData.rating),
          comment: reviewData.comment,
        },
        {
          headers: { Authorization: token },
        }
      );
      const { success, message } = response.data;

      if (success) {
        console.log(message);
        fetchProduct(); // Refresh the product data to show the new review
      } else {
        console.log(message);
      }

      setReviewData({
        rating: 0,
        comment: "",
      });
      setShowReviewForm(false);
    } catch (error) {
      console.log("Error adding review", error);
    }
  };

  const handleAddToCart = () => {
    try {
      console.log("Quantity before adding to cart: " + quantity);
      const token = localStorage.getItem("token");
      const response = axios.post(`${apiUrl}/api/cart/update`, {
        productId: id,
        productName: product.productName,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        quantity: quantity
      }, {
        headers: { Authorization: token }
      });
      setShowCartedMessage(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    } else if (value < 1) {
      setQuantity(1);
    } else if (value > 10) {
      setQuantity(10);
    }
  };

  const reviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.id]: e.target.value });
  };

  return (
    <div className="Item container">
      {product ? (
        <div className="item-page row justify-content-between">
          <div className="item-content col-md-4 col-sm-2 order-first">
            <h2 className="header">{product.productName}</h2>
            <img className="item-img" src={product.imageUrl} alt="" />
            <div className="item-tags">
              {product.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </div>
          </div>
          <div className="item-description col-md-5">
            <h4>About this item</h4>
            <p>{product.description}</p>
          </div>

          {product.isAuctioning ? (
            <div className="item-bidding col-md-2 col-sm-2">
              {product.startingPrice >= product.currentBid ? 
                <p>Starting price: <strong>${product.startingPrice}</strong></p> :
                <div>
                  <p>Current Bid: <strong>${product.currentBid}</strong></p>
                  <p>Bids: ({product.quantityOfBids})</p>
                </div>
              }
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
              />
              <button onClick={handleBid}>Place Bid</button>
            </div>
          ) : (
            <div className="item-pricing col-md-2 col-sm-2">
              <p>Price: <strong>${product.price}</strong></p>
              <p>Amount In Stock: {product.amountInStock}</p>
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="item-button-container">
                <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
                <button className="btn btn-warning">Buy Now</button>
              </div>
            </div>
          )}

          <div className="item-reviews">
            <h3>Reviews</h3>
            <button onClick={() => setShowReviewForm(true)}>Write a Review</button>
            <p>Overall Customer Review Rating: {overallRating}</p>
            {product.reviews.length ? (
              <div className="item-review-container">
                {product.reviews.map((review) => (
                  <Review
                    key={review._id} // Use unique key for each review
                    username={review.username}
                    rating={review.rating}
                    comment={review.comment}
                  />
                ))}
              </div>
            ) : (
              <div>No Reviews</div>
            )}
            {showCartedMessage && (
              <div className="carted-message">
                <p>Added Item to Cart!</p>
                <button onClick={() => navigate('/Cart')}>Go To Cart</button>
                <button onClick={() => setShowCartedMessage(false)}>Continue Shopping</button>
              </div>
            )}
            {showReviewForm && (
              <div className="review-form">
                <form onSubmit={addReview}>
                  <div className="form-group">
                    <p>Rating: {reviewData.rating}</p>
                    <input
                      id="rating"
                      type="range"
                      value={reviewData.rating}
                      onChange={reviewChange}
                      min={0}
                      max={5}
                      step={0.5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="comment"
                      type="text"
                      placeholder="Add your review"
                      value={reviewData.comment}
                      onChange={reviewChange}
                      required
                    />
                  </div>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Item;
