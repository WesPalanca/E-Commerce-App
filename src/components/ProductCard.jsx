import { Link } from "react-router-dom";
import cartSVG from '../assets/cart.svg';
import starSVG from '../assets/star.svg';
import axios from "axios";
import savedStarSVG from '../assets/savedStar.svg';
import savedCartSVG from '../assets/savedCart.svg';
import { useState, useEffect } from "react";
import { checkCartStatus, checkWishlistStatus } from "../../controllers/product";
const ProductCard = (props) =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [savedToCart, setSavedToCart] = useState(false);
    const [savedToWishlist, setSavedToWishList] = useState(false);

    useEffect(() => {

        checkCartStatus();
        checkWishListStatus();
    }, [props.id, apiUrl]);


    const checkWishListStatus = async() => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/prod/products/wishlist/status`,{
                params: {productId: props.id},
                headers: { Authorization: token}
            })
            const {success, isInWishlist, message} = (await response).data;
            if (success){
                
                setSavedToWishList(isInWishlist);
            }
            else{
                console.log(message);
            }
        
        }   
        catch(error){
            console.log(error);
        } 
    }
    const checkCartStatus = async() =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/prod/products/cart/status`,{
                params: {productId: props.id},
                headers: {Authorization: token}
            })
            const { success, isInCart, message } = (await response).data;
            if(success){
                 
                setSavedToCart(isInCart);
            }
            else{
                console.log(message);
            }
        } catch(error){
            console.log(error);
        }
    }


    
    
    return(
        <div className="container">
            <div className="product-card">
            <Link to={`/Item/${props.id}/${props.productName}`}><img className="product-img" src={props.imageUrl} alt="" /></Link>
            <div className="product-card-label">
            <Link className="header" to={`Item/${props.id}/${props.productName}`}>{props.productName}</Link>
            <p>${props.price}</p>
            
                <div className="product-card-buttons">
                {savedToCart ? <button className="cart btn" onClick={async () =>{
                await props.OutCart(props.id); 
                    checkCartStatus();
                }}><img src={savedCartSVG} alt="cart" /></button>
                :
                <button className="cart btn" onClick={async () =>{
                    await props.ToCart(props.id, props.productName, props.price, props.description);
                    checkCartStatus();
                    }}><img src={cartSVG} alt="cart" /></button>
                }
                {/* add toggle */}
                {savedToWishlist ? <button className="star btn" onClick={async () =>{
                    await props.OutWishList(props.id); 
                    checkWishListStatus();
                }}><img src={savedStarSVG} alt="wishlist" /></button>
                : 
                <button  className="star btn" onClick={async () =>{
                    await props.ToWishList(props.id, props.productName, props.price, props.description); 
                    checkWishListStatus();}}><img src={starSVG} alt="wishlist" /></button>}
                </div>
             </div>
            </div>
        </div>
    )
}


export default ProductCard;
