import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import toTitleCase from "titlecase";

const Shop = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

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

    const handleSearch = async (e) =>{
        e.preventDefault();
        console.log(`Searching for ${toTitleCase(searchValue)}`);
        try{
            const response = await axios.get(`${apiUrl}/api/prod/products/search`,{
                params: {query: toTitleCase(searchValue)}
            });
            const { message, products: searchedProducts, success } = response.data;
            if(success && searchedProducts.length > 0){
                setProducts(searchedProducts);
                console.log(message);
            }
            else{
                setProducts(message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="container Shop">
        <Sidebar />
            <h1 className='shop-header'>Shopping</h1>
            <form onSubmit={handleSearch} className="SearchForm">
                <input placeholder="Search" type="text" className="search-bar" onChange={(e) => setSearchValue(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            {
                loading || products.length == 0 ? <p>Loading...</p> :
                (
                <div className="row product-card-container">
                    {products.map(card => 
                        <div className="col-md-3 mb-4 col-sm-3" key={card._id}>
                            <ProductCard id={card._id} imageUrl={card.imageUrl} description={card.description} productName={card.productName} price={card.price}/>
                        </div>
                    )}
                </div>
            
            )
            
                
            }
        </div>
    )
}


export default Shop;