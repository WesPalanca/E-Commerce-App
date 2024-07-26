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
    const fetchCartTotal = async(token) =>{
        try{
            const response = await axios.get(`${apiUrl}/api/prod/products/cart/total`,{
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
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${apiUrl}/api/prod/products/cart`,{
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
            <h1>Cart</h1>
           <div className="cart-container product-card-container"> 
            {userCart == undefined || userCart.length == 0 ? <p>No products here!</p>: 
                userCart.map(card => 
                    <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                        <CartCard onRemove={ItemOutCart} id={card._id} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                    </div>
                )}
            </div>
            <div className="cart-total">
        
                <p>Estimated total: ${total}</p>
                <p>Sales tax will be calculated during checkout where applicable</p>
                <button onClick={() => navigate('/Checkout')}>checkout</button>
            </div>
        </div>
    )
}

export default Cart;