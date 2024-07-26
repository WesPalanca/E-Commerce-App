import { Link } from "react-router-dom";
import cartSVG from '../assets/cart.svg';
import starSVG from '../assets/star.svg';
import axios from "axios";
import savedStarSVG from '../assets/savedStar.svg';
import savedCartSVG from '../assets/savedCart.svg';
import { useState, useEffect } from "react";
const ProductCard = (props) =>{
    const [savedToCart, setSavedToCart] = useState(false);
    const [savedToWishlist, setSavedToWishList] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const checkWishListStatus = async() => {
            try{
                const token = localStorage.getItem("token");
                const response = axios.get(`${apiUrl}/api/prod/products/wishlist/status`,{
                    params: {productId: props.id},
                    headers: { Authorization: token}
                })
                const {success, isInWishlist, message} = (await response).data;
                if (success){
                    
                    setSavedToWishList(isInWishlist);
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
            } catch(error){
                console.log(error);
            }
        }
        checkCartStatus();
        checkWishListStatus();
    }, [props.id, apiUrl]);


    
    const ItemToWishList = async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/prod/products/wishlist`,{
                productId: props.id,
                productName: props.productName,
                price: props.price,
                description: props.description
            },{
                headers: {Authorization: token}
            });

            setSavedToWishList(true);

        }
        catch(error){
            console.log(error)
        }
    }
    const ItemOutWishList = () =>{
        try{
            const token = localStorage.getItem("token");
            const response = axios.delete(`${apiUrl}/api/prod/products/wishlist`,{
                data: {productId: props.id},
                headers: {Authorization: token}
            });
            setSavedToWishList(false);
        }
        catch(error){
            console.log(error)
        }
    }

    const ItemToCart = async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/prod/products/cart`,{
                productId: props.id,
                productName: props.productName,
                price: props.price,
                description: props.description
            },
            {
                headers: {Authorization: token}
            }    
        );
            setSavedToCart(true);
        }
        catch(error){
            console.log(error);
        }
    }
    const ItemOutCart = async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${apiUrl}/api/prod/products/cart`,{
                data: {productId: props.id},
                headers: {Authorization: token}
            })
            setSavedToCart(false);
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <div className="container">
            <div className="product-card">
            <Link className="header" to={`Item/${props.id}/${props.productName}`}>{props.productName}</Link>
            <img className="product-img" src={props.imageUrl} alt="" />
            <p>${props.price}</p>
            {savedToCart ? <button className="cart btn" onClick={ItemOutCart}><img src={savedCartSVG} alt="cart" /></button>
            :
            <button className="cart btn" onClick={ItemToCart}><img src={cartSVG} alt="cart" /></button>
            }
             {/* add toggle */}
            {savedToWishlist ? <button className="star btn" onClick={ItemOutWishList}><img src={savedStarSVG} alt="wishlist" /></button>
            : 
            <button  className="star btn" onClick={ItemToWishList}><img src={starSVG} alt="wishlist" /></button>}
        </div>
        </div>
    )
}


export default ProductCard;
