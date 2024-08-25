import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sell = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productName: "",
        price: "",
        description: "",
        amountInStock: 1,
        imageUrl: null,  
        // tags: [],
        startingPrice: 0, 
        auctionEnd: "",
        isAuctioning: false
    });

    const handleListing = async (e) => {
        e.preventDefault();
        console.log(productData);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/prod/products/new`, {
                productName: productData.productName,
                price: productData.price,
                description: productData.description,
                amountInStock: productData.amountInStock,
                imageUrl: productData.imageUrl,
                isAuctioning: productData.isAuctioning,
                startingPrice: productData.startingPrice,
                auctionEnd: productData.auctionEnd
            }, {
                headers: { Authorization: token }
            });
            const { success, message } = response.data;
            if (success) {
                console.log(message);
                navigate('/Shop');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    const handleCheckboxChange = (e) => {
        setProductData(prevData => ({
            ...prevData,
            isAuctioning: e.target.checked
        }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductData(prevData => ({
            ...prevData,
            imageUrl: file
        }));
    }

    return (
        <div className="Sell container">
            <div className="product-creation container">
                <label className="sell-auction-label" htmlFor="check-apple">Auctioning</label>
                <div className="checkbox-apple">
                    <input
                        className="yep"
                        id="check-apple"
                        onChange={handleCheckboxChange}
                        checked={productData.isAuctioning}
                        type="checkbox"
                    />
                    <label htmlFor="check-apple"></label>
                </div>
                {productData.isAuctioning ?
                    <div>
                        <form onSubmit={handleListing} className="auction-form">
                            <strong>Title</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="productName"
                                    onChange={handleFormChange}
                                    value={productData.productName}
                                    placeholder="What are you selling?"
                                    required={true}
                                />
                            </div>
                            <strong>Description</strong>
                            <div className="form-group description-container">
                                <textarea
                                    className="form-control add-description"
                                    type="text"
                                    id="description"
                                    onChange={handleFormChange}
                                    value={productData.description}
                                    placeholder="Give a description of your product"
                                    required={true}
                                ></textarea>
                            </div>
                            <strong>Give a starting price</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="number"
                                    id="startingPrice"
                                    value={productData.startingPrice}
                                    onChange={handleFormChange}
                                    placeholder="List your price"
                                    required={true}
                                />
                            </div>
                            <strong>Upload an image</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file"
                                    id="imageUrl"
                                    onChange={handleFileChange}
                                    required={false}
                                />
                            </div>
                            <strong>Auction End</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="date"
                                    id="auctionEnd"
                                    value={productData.auctionEnd}
                                    onChange={handleFormChange}
                                    required={true}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                    :
                    <div>
                        <form className="standard-form" onSubmit={handleListing}>
                            <strong>Title</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="productName"
                                    onChange={handleFormChange}
                                    value={productData.productName}
                                    placeholder="What are you selling?"
                                    required={true}
                                />
                            </div>
                            <strong>Description</strong>
                            <div className="form-group description-container">
                                <textarea
                                    className="form-control add-description"
                                    type="text"
                                    id="description"
                                    onChange={handleFormChange}
                                    value={productData.description}
                                    placeholder="Give a description of your product"
                                    required={true}
                                ></textarea>
                            </div>
                            <strong>Price</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="price"
                                    value={productData.price}
                                    onChange={handleFormChange}
                                    placeholder="List your price"
                                    required={true}
                                />
                            </div>
                            <strong>Stock</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="number"
                                    id="amountInStock"
                                    value={productData.amountInStock}
                                    onChange={handleFormChange}
                                    placeholder="How many are you selling?"
                                    required={true}
                                />
                            </div>
                            <strong>Upload an image</strong>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="file"
                                    id="imageUrl"
                                    onChange={handleFileChange}
                                    required={false}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>}
            </div>
        </div>
    )
}

export default Sell;