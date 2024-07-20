import { Link } from "react-router-dom";
const ProductCard = (props) =>{
    return(
        <div className="container">
            <div className="product-card">
            <Link className="header" to={`Item/${props.id}/${props.productName}`}>{props.productName}</Link>
            <img className="product-img" src={props.imageUrl} alt="" />
            <p>${props.price}</p>
        </div>
        </div>
    )
}


export default ProductCard;
