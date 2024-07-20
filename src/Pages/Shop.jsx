import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Shop = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () =>{
        try{
            const response = await axios.get(`${apiUrl}/api/prod/products`);
            console.log(response);
            const { allProducts, success, message } = response.data;
            if (success){
                console.log(message);
                setProducts(allProducts);
                setLoading(false);

            }else{
                console.log(message);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchProducts();
    }, [])

    return(
        <div className="container Shop">
            <h1 className='shop-header'>Shopping</h1>
            {
                loading || products.length == 0 ? <p>Loading...</p> :
                (
                <div className="row product-card-container">
                    {products.map(card => 
                        <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                            <ProductCard id={card._id} imageUrl={card.imageUrl} productName={card.productName} price={card.price}/>
                        </div>
                    )}
                </div>
            
            )
            
                
            }
        </div>
    )
}


export default Shop;