import { Link } from "react-router-dom";

const WishlistCard = (props) =>{
    return(
        <div className="container Wishlist">
            <div className="wishlist-card">
                <Link to={`/Item/${props.id}/${props.productName}`}>{props.productName}</Link>
                <p>${props.price}</p>
                <p>{props.description}</p>
                <div className="card-btn-container">
                    <button className="remove-btn btn" onClick={() => props.onRemove(props.id)}>remove</button>
                    <button className="add-btn btn" onClick={() =>props.onAdd(props.id, props.productName, props.price, props.description, props.imageUrl)}>Add To Cart</button>
                </div>
                
            </div>

        </div>
    )

}

export default WishlistCard;