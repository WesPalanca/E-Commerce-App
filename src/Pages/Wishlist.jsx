import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
const Wishlist = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [userWishlist, setUserWishlist] = useState();
    useEffect(() =>{
        const fetchWishlist = async () =>{
            try{
                const token = localStorage.getItem("token");
                const response = axios.get(`${apiUrl}/api/prod/products/wishlist`,{
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
        fetchWishlist();
    }, [])

    return(
        <div className="Wishlist container">
            <div className="back-link">
                <Link to={'/Shop'}>back</Link>
            </div>
            <h1>Wishlist</h1>
           <div className="wishlist-container product-card-container"> 
            {userWishlist == undefined || userWishlist.length == 0 ? <p>No products here!</p>: 
                userWishlist.map(card => 
                    <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                        <ProductCard id={card._id} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                    </div>
                )}
            </div>
        </div>
    )
}



export default Wishlist;