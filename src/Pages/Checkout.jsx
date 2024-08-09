import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import axios from "axios";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {total, items, isBuyNow} = location.state || {};
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiration: "",
        cvv: "",
        cardFirstName: "",
        cardLastName: "",
        streetAddress: "",
        city: "",
        area: "",
        zip: "",
        phoneNumber: ""
    });
    useEffect(() =>{
        console.log(items);
        console.log(total);
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${apiUrl}/api/order/place`,{
                total: total,
                cart: items,
                isBuyNow: isBuyNow
            
    
            },{
                headers: {Authorization: token}
            });
            const {success, message} = response.data;
            if (success){
                console.log(message);
                navigate('/Shop');
            }            
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="Checkout container">
            <h3>Checkout</h3>
            <p>Enter your card info</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <MaskedInput
                        className="form-control"
                        type="text"
                        placeholder="Card Number"
                        onChange={handleChange}
                        id="cardNumber"
                        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                        value={formData.cardNumber}
                    />
                </div>
                <div className="form-group">
            
                    <MaskedInput
                        className="form-control"
                        type="text"
                        placeholder="Expiration Date"
                        onChange={handleChange}
                        id="expiration"
                        mask={[/[1-9]/, /\d/, "/",/\d/, /\d/]}
                        value={formData.expiration}
                    />
                    <MaskedInput
                        className="form-control"
                        type="text"
                        placeholder="CVV"
                        onChange={handleChange}
                        id="cvv"
                        mask={[/[1-9]/ ,/\d/,/\d/]}
                        value={formData.cvv}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        id="cardFirstName"
                        value={formData.cardFirstName}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange}
                        id="cardLastName"
                        value={formData.cardLastName}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Street Address"
                        onChange={handleChange}
                        id="streetAddress"
                        value={formData.streetAddress}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                        onChange={handleChange}
                        id="city"
                        value={formData.city}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="State/Province/Region"
                        onChange={handleChange}
                        id="area"
                        value={formData.area}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="ZIP code"
                        onChange={handleChange}
                        id="zip"
                        value={formData.zip}
                    />
                </div>
                <div className="form-group">
                    <MaskedInput
                        className="form-control"
                        type="text"
                        placeholder="Phone number"
                        onChange={handleChange}
                        id="phoneNumber"
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        value={formData.phoneNumber}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Place Order</button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
