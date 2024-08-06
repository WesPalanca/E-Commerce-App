import axios from "axios";
import { Link } from "react-router-dom";

const CartCard = (props) =>{

    return(
        <div className="container Cart">
            <div className="cart-card">
                <img src={props.imageUrl} className="cart-img" />
                <div className="cardIdentifiers">
                    <Link to={`/Item/${props.id}/${props.productName}`}>{props.productName}</Link>
                </div>
                <div className="cardSecondary">
                    <p>${props.price}</p>
                    <p>x{props.quantity}</p>
                    <p>{props.uniqueId}</p>
                    <div className="card-btn-container">
                        <button className="remove-btn btn" onClick={() =>props.onRemove(props.uniqueId)}>remove</button>
                    </div>


                </div>

            </div>

        </div>
    )
}










export default CartCard;