import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
const Cart = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [userCart, setUserCart] = useState();
    const [total, setTotal] = useState();
    useEffect(() =>{
        setTotal(0);
        const token = localStorage.getItem("token");
        if(token){
            fetchCart(token);
            fetchCartTotal(token);
        }
    }, [])

    const fetchCart = async (token) =>{
        try{

            const response = axios.get(`${apiUrl}/api/cart/user`,{
                headers: {Authorization: token}
            });
            const {success, cart, message } = (await response).data;
            if(success){
                // console.log(message);
                console.log(response.data);
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
    const fetchCartTotal = async(token) =>{
        try{
            const response = await axios.get(`${apiUrl}/api/cart/total`,{
                headers: {Authorization: token}
            }
            );
            const {success, cartTotal, message} = response.data;
            if(success){
                setTotal(cartTotal);
            }
            else{
                console.log(message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const ItemOutCart = async (id) =>{
        console.log(id);
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${apiUrl}/api/cart/update`,{
                data: {productId: id},
                headers: {Authorization: token}
            })
    
            fetchCart(token);
            fetchCartTotal(token);
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="Cart container">
            <div className="back-link">
                <Link to={'/Shop'}>back</Link>
            </div>
            <h1>Your Shopping Cart</h1>
           <div className="cart-content">
            <div>
            <div className="cart-container "> 
                {userCart == undefined || userCart.length == 0 ? <p>Your cart is empty </p>: 
                    userCart.map((card, index) => 
                        <div className="col-md-3 mb-4 col-sm-3" key={`${card._id}-${index}`}>
                            <CartCard onRemove={ItemOutCart} id={card._id} quantity={card.quantity} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                        </div>  
                    )}
                </div>
                
            </div>
            
                <div className="cart-total">
            
                    <p>Estimated total: <strong>${total}</strong></p>
                    <p>Review Your Products</p>
                    <div className="cart-total-buttons">
                        <button onClick={() =>navigate('/Shop')} className="btn btn-secondary">Continue Shopping</button>
                        <button className="checkout-btn btn btn-primary" onClick={() => navigate('/Checkout')}>Continue to payment</button>
                    </div>
                
                </div>
           </div>
        </div>
    )
}

export default Cart;