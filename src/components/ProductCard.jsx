import { Link } from "react-router-dom";
import starSVG from '../assets/star.svg';
import axios from "axios";
import savedStarSVG from '../assets/savedStar.svg';
import { useState, useEffect } from "react";

const ProductCard = (props) =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [savedToWishlist, setSavedToWishList] = useState(false);

    useEffect(() => {

    
        checkWishListStatus();
    }, [props.id, apiUrl]);


    const checkWishListStatus = async() => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${apiUrl}/api/wish/wishlist/status`,{
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
    

    
    
    return(
        <div className="container">
            <div className="product-card">
            <Link to={`/Item/${props.id}/${props.productName}`}><img className="product-img" src={props.imageUrl} alt="" /></Link>
            <div className="product-card-label">
            <Link className="header" to={`/Item/${props.id}/${props.productName}`}>{props.productName}</Link>
            <p>${props.price}</p>
            
                <div className="product-card-buttons">
                {savedToWishlist ? <button className="star btn" onClick={async () =>{
                    await props.OutWishList(props.id); 
                    checkWishListStatus();
                }}><img src={savedStarSVG} alt="wishlist" /></button>
                : 
                <button  className="star btn" onClick={async () =>{
                    await props.ToWishList(props.id, props.productName, props.price, props.description, props.imageUrl); 
                    checkWishListStatus();}}><img src={starSVG} alt="wishlist" /></button>}
                </div>
             </div>
            </div>
        </div>
    )
}


export default ProductCard;
