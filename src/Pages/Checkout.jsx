import { useState } from "react";
import ReactInputMask from "react-input-mask";
import MaskedInput from "react-text-mask";

const Checkout = () => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiration: "",
        cvv: "",
        cardFirstName: "",
        cartLastName: "",
        streetAddress: "",
        city: "",
        area: "",
        zip: "",
        phoneNumber: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
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
                        id="cartLastName"
                        value={formData.cartLastName}
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
