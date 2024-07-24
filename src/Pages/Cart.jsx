import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
const Cart = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userCart, setUserCart] = useState();
    useEffect(() =>{
        const fetchCart = async () =>{
            try{
                const token = localStorage.getItem("token");
                const response = axios.get(`${apiUrl}/api/prod/products/cart`,{
                    headers: {Authorization: token}
                });
                const {success, cart, message } = (await response).data;
                if(success){
                    console.log(message);
                    setUserCart(cart);
                }
                else{
                    console.log(message);
                }
                
            }
            catch(error){
                console.log(error);
            }
        }
        fetchCart();
    }, [])
    return(
        <div className="Cart container">
            <div className="back-link">
                <Link to={'/Shop'}>back</Link>
            </div>
            <h1>Cart</h1>
           <div className="Cart-container product-card-container"> 
            {userCart == undefined || userCart.length == 0 ? <p>No products here!</p>: 
                userCart.map(card => 
                    <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                        <ProductCard id={card._id} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;