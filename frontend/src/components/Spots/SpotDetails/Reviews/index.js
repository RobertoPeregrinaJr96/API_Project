import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import reviewsReducer, { fetchReviewThunk } from "../../../../store/reviewsReducer";
import { deleteReviewThunk } from "../../../../store/reviewsReducer";
import OpenModalButton from '../../../OpenModalButton/index'




const ReviewItemsIndex = () => {

    const spotIdObj = useParams()
    console.log('spotIdObj in ReviewItemsIndex', spotIdObj)
    const spotId = spotIdObj.id
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    console.log('user in ReviewItemsIndex', user)

    useEffect(() => {
        dispatch(fetchReviewThunk(spotId))
    })
    const review = useSelector(state => state.reviews.spot)
    console.log('review in ReviewItemsIndex', review)
    const reviewArray = Object.values(review)
    console.log('spotIdObj in ReviewItemsIndex', spotIdObj)
    const sortedReviewArray = reviewArray.sort((a, b) => new Date(a) - new Date(b))
    console.log('sortedReviewArray in ReviewItemsIndex', sortedReviewArray)




    return (
        <div className="review-container">
            {sortedReviewArray.map((review) => {
                console.log("review in Map in ReviewItemIndex", review)
                return (
                    <div className="review-content-div">
                        <p className="review-User-firstName">review.User.firstName</p>
                        <p className="review-review">review.review</p>
                    </div>
                )
            })}
        </div>
    )


}

export default ReviewItemsIndex
