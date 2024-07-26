import axios from "axios";
import { Link } from "react-router-dom";

const CartCard = (props) =>{

    return(
        <div className="container Cart">
            <div className="cart-card">
                <Link to={`/Item/${props.id}/${props.productName}`}>{props.productName}</Link>
                <p>${props.price}</p>
                <p>{props.description}</p>
                <div className="card-btn-container">
                <button className="remove-btn btn" onClick={() =>props.onRemove(props.id)}>remove</button>
                </div>

            </div>

        </div>
    )
}










export default CartCard;