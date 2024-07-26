import axios from "axios";
import { Link } from "react-router-dom";

const CartCard = (props) =>{

    return(
        <div className="container">
            <div className="cart-card">
                <Link to={`Item/${props.id}/${props.productName}`}>{props.productName}</Link>
                <p>${props.price}</p>
                <p>{props.description}</p>
                <button onClick={() =>props.onRemove(props.id)}>remove</button>

            </div>

        </div>
    )
}










export default CartCard;