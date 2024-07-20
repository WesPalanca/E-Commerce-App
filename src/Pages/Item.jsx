import { useParams } from "react-router-dom"
const Item = () =>{
    const { id, productName } = useParams();
    console.log(productName);
    return(
        <h1>{productName}</h1>
    )
}


export default Item;