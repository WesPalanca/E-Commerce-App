import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
const Wishlist = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [userWishlist, setUserWishlist] = useState();
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    useEffect(() =>{
        const token = localStorage.getItem("token");
        if (token){
            fetchWishlist(token);
        }
    }, [])
    const fetchWishlist = async (token) =>{
        try{
            const response = axios.get(`${apiUrl}/api/wish/wishlist`,{
                headers: {Authorization: token}
            });
            const {success, wishlist, message } = (await response).data;
            if(success){
                console.log(message);
                setUserWishlist(wishlist);
            }
            else{
                console.log(message);
            }
            
        }
        catch(error){
            console.log(error);
        }
    }

    const ItemToCart = async (id, productName, price, description) =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/cart/update`,{
                productId: id,
                productName: productName,
                price: price,
                description: description
            },
            {
                headers: {Authorization: token}
            }    
        );
        console.log(response.data.message);
        setShowAddedMessage(true);
        }
        catch(error){
            console.log(error);
        }
    }


    const ItemOutWishList = (id) =>{
        try{
            const token = localStorage.getItem("token");
            const response = axios.delete(`${apiUrl}/api/wish/wishlist`,{
                data: {productId: id},
                headers: {Authorization: token}
            });
            fetchWishlist(token);
    
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className="Wishlist container">
            <div className="back-link">
                <Link to={'/Shop'}>back</Link>
            </div>
            <h1>Wishlist</h1>
           <div className="wishlist-container "> 
            {userWishlist == undefined || userWishlist.length == 0 ? <p>Empty</p>: 
                userWishlist.map(card => 
                    <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                        <WishlistCard onRemove={ItemOutWishList} onAdd={ItemToCart} id={card._id} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                    </div>
                )}
            </div>
            {showAddedMessage && 
                <div className="wishlist-message-container">
                    <div className="wishlist-message">
                        <h3>Added To Your Cart!</h3>
                        <button onClick={() => setShowAddedMessage(false)}>Continue Shopping</button>

                    </div>
                </div>
                    }
        </div>
    )
}



export default Wishlist;