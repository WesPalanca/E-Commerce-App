import star from "../assets/star.svg";
import savedStar from "../assets/savedStar.svg";
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
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [showCartedMessage, setShowCartedMessage] = useState(false);
  const [isHighestBidder, setIsHighestBidder] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [bidStatusMessage, setBidStatusMessage] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/prod/products/item`, {
        params: { productId: id },
      });
      const { success, product, message } = response.data;

      if (success) {
      
        setProduct(product);
        console.log(product);
        setOverallRating(product.overallRating);
        checkBiddingStatus();
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log("Error fetching product", error);
    }
  };

  const checkCartStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/cart/status`, {
        params: { productId: id },
        headers: { Authorization: token },
      });
      const { success, isInCart, message } = response.data;
      if (success) {
        setIsInCart(isInCart);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/wish/status`, {
        params: { productId: id },
        headers: { Authorization: token },
      });
      const { success, isInWishlist, message } = response.data;
      if (success) {
        setIsInWishlist(isInWishlist);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkBiddingStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/bid/status`, {
        params: {
          productId: id,
        },
        headers: { Authorization: token },
      });
      const { success, message, isHighestBidder} = response.data;
      if (success) {
        setBidStatusMessage(message);
        setIsHighestBidder(isHighestBidder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCartStatus();
    checkWishlistStatus();
    checkBiddingStatus();
    fetchProduct();
    // WebSocket event listeners
    socket.on("newBid", (data) => {
      if (data.productId === id) {
        fetchProduct();
      }
    });
    return () => {
      socket.off("newBid");
    };
  }, [id]);

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
        fetchProduct(); // Refresh the product data to show the updated quantity of bids
        
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
      const token = localStorage.getItem("token");
      const response = axios.post(
        `${apiUrl}/api/cart/update`,
        {
          productId: id,
          productName: product.productName,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          quantity: quantity,
        },
        {
          headers: { Authorization: token },
        }
      );
      setShowCartedMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post(
        `${apiUrl}/api/wish/wishlist`,
        {
          productId: id,
          productName: product.productName,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          isAuctioning: product.isAuctioning
        },
        {
          headers: { Authorization: token },
        }
      );
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1) {
      setValidationMessage("Quantity cannot be less than 1.");
      setQuantity(1);
    } else if (value > product.amountInStock) {
      setValidationMessage(
        `Quantity cannot exceed the amount in stock (${product.amountInStock}).`
      );
      setQuantity(product.amountInStock);
    } else {
      setValidationMessage(""); // Clear the message if quantity is valid
      setQuantity(value);
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
              {product.startingPrice >= product.currentBid ? (
                <p>
                  Starting price: <strong>${product.startingPrice}</strong>
                </p>
              ) : (
                <div>
                  <p>
                    Current Bid: <strong>${product.currentBid}</strong>
                  </p>
                  <p>Bids: ({product.quantityOfBids})</p>
                  <p className={`text ${isHighestBidder ? "text-success" : "text-danger"}`}>Bid status: {bidStatusMessage}</p>
                </div>
              )}
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
              />
              <button onClick={handleBid}>Place Bid</button>
              {!isInWishlist ? (
                  <button
                    onClick={handleAddToWishlist}
                    className="btn btn-light btn-outline-secondary"
                  >
                    Wishlist <img src={star} alt="" />
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/Wishlist")}
                  >
                    Wishlist <img src={savedStar} alt="" />
                  </button>
                )}
            </div>
          ) : (
            <div className="item-pricing col-md-2 col-sm-2">
              <p>
                Price: <strong>${product.price}</strong>
              </p>
              <p>Amount In Stock: {product.amountInStock}</p>
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min={1}
                max={product.amountInStock}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <p>{validationMessage}</p>
              <div className="item-button-container">
                {!isInCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/Cart")}
                  >
                    Saved To Cart!
                  </button>
                )}
                <button className="btn btn-warning">Buy Now</button>
                {!isInWishlist ? (
                  <button
                    onClick={handleAddToWishlist}
                    className="btn btn-light btn-outline-secondary"
                  >
                    Wishlist <img src={star} alt="" />
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/Wishlist")}
                  >
                    Wishlist <img src={savedStar} alt="" />
                  </button>
                )}
              </div>
              {/* make better css */}
            </div>
          )}

          <div className="item-reviews">
            <h3>Reviews</h3>
            <button onClick={() => setShowReviewForm(true)}>
              Write a Review
            </button>
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
                <button onClick={() => navigate("/Cart")}>Go To Cart</button>
                <button
                  onClick={() => {
                    setShowCartedMessage(false);
                    navigate(0);
                  }}
                >
                  Continue Shopping
                </button>
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
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
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