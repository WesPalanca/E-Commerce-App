import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import ProductCard from "../components/ProductCard";

const AuthorListings = () =>{
    const ItemToWishList = async (id, productName, price, description, imageUrl, isAuctioning) =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/wish/wishlist`,{
                productId: id,
                productName: productName,
                price: price,
                description: description,
                imageUrl: imageUrl,
                isAuctioning: isAuctioning
            },{
                headers: {Authorization: token}
            });

            // setSavedToWishList(true);

        }
        catch(error){
            console.log(error)
        }
    }
    const ItemOutWishList = async (id) =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${apiUrl}/api/wish/wishlist`,{
                data: {productId: id},
                headers: {Authorization: token}
            });
            // setSavedToWishList(false);
        }
        catch(error){
            console.log(error)
        }
    }

    const ItemToCart = async (id, productName, price, description, imageUrl) =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/cart/update`,{
                productId: id,
                productName: productName,
                price: price,
                description: description,
                imageUrl: imageUrl,
                quantity: 1
            },
            {
                headers: {Authorization: token}
            }    
        );
            // setSavedToCart(true);
            fetchAmountInCart(token);
        }
        catch(error){
            console.log(error);
        }
    }
    const ItemOutCart = async (id) =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${apiUrl}/api/cart/update`,{
                data: {productId: id},
                headers: {Authorization: token}
            })
            // setSavedToCart(false);
            fetchAmountInCart(token);
        }
        catch(error){
            console.log(error);
        }
    }

    const {author, authorId} = useParams();
    const [authorProds, setAuthorProds] = useState();
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchAuthorProducts = async () =>{
            try{
                const response = await axios.get(`${apiUrl}/api/prod/author-listings`,{
                    params: {authorId: authorId}
                })
                const {success, message, products} = response.data;
                if(success){
                    setAuthorProds(products);
                    setLoading(false);
                    console.log(message)
                }
                else{
                    console.log(message);
                }
            }
            catch(error){
                console.log(error);
            }
    }
    useEffect(() => {
        fetchAuthorProducts();
    }, [])
    return(
       <div className="author-listing container">
         <h3>Listings made by {author}</h3>
        <div className="listing-container container">
            {loading ? <p>loading...</p> : authorProds.map(product => <div className="row" key={product._id}>
                                <ProductCard id={product._id} 
                                imageUrl={product.imageUrl} 
                                description={product.description}
                                productName={product.productName} 
                                author={product.author}
                                quantityOfBids={product.quantityOfBids}
                                startingPrice={product.startingPrice}
                                isAuctioning={product.isAuctioning}
                                currentBid={product.currentBid} 
                                price={product.price}
                                ToCart={ItemToCart}
                                OutCart={ItemOutCart}
                                ToWishList={ItemToWishList}
                                OutWishList={ItemOutWishList}
                                />
                                
                            </div>)}
        </div>
       </div>
    )
}

export default AuthorListings;