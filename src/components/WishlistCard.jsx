import { Link, useNavigate } from "react-router-dom";

const WishlistCard = (props) =>{
    const navigate = useNavigate();
    // const checkBiddingStatus = async () => {
    //     try {
    //       const token = localStorage.getItem("token");
    //       const response = await axios.get(`${apiUrl}/api/bid/status`, {
    //         params: {
    //           productId: id,
    //         },
    //         headers: { Authorization: token },
    //       });
    //       const { success, message, isHighestBidder} = response.data;
    //       if (success) {
    //         setBidStatusMessage(message);
    //         setIsHighestBidder(isHighestBidder);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    



    return(
        <div className="container Wishlist">
            <div className="wishlist-card">
                <Link to={`/Item/${props.id}/${props.productName}`}>{props.productName}</Link>
                <p>${props.price}</p>
                <p>{props.description}</p>
                <div className="card-btn-container">
                    <button className="remove-btn btn" onClick={() => props.onRemove(props.id)}>remove</button>
                    { props.isAuctioning ?  
                    <button className="btn" onClick={() => navigate(`/Item/${props.id}/${props.productName}`)}>Make a bid</button>
                    :
                    <button className="btn" onClick={() => props.onAdd(props.id, props.productName, props.price, props.description, props.imageUrl)}>Add To cart</button>}
                   
                </div>
                
            </div>

        </div>
    )

}

export default WishlistCard;