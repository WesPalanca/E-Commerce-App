import axios from "axios";

const Review = ({ username, rating, comment, title }) => {

    return(
        <div className="item-review">
            <p className="review-username"><strong>{username}</strong></p>
            <p><strong>{title}</strong></p>
            <p>{rating}/5</p>
            <p className="review-comment">{comment}</p>
            
        </div>
    )
}

export default Review;