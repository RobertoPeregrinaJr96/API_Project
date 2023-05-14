import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import reviewsReducer, { fetchReviewThunk } from "../../../../store/reviewsReducer";
import { deleteReviewThunk } from "../../../../store/reviewsReducer";
import OpenModalButton from '../../../OpenModalButton/index'
import DeleteReview from "./deleteReview";
import { fetchDetailedSpotThunk } from "../../../../store/spotReducer";



const ReviewItemsIndex = () => {


    const dispatch = useDispatch();
    const spotIdObj = useParams()
    // console.log('spotIdObj in ReviewItemsIndex', spotIdObj)
    const spotId = spotIdObj.id
    // console.log('spotId in ReviewItemsIndex', spotId)

    const user = useSelector(state => state.session.user)
    // console.log('user in ReviewItemsIndex', user)

    const review = useSelector(state => state.reviews.spot)
    console.log('review in ReviewItemsIndex', review)
    const reviewArray = Object.values(review)
    // console.log('reviewArray in ReviewItemsIndex', reviewArray)
    const sortedReviewArray = reviewArray.sort((a, b) => new Date(a) - new Date(b))
    // console.log('sortedReviewArray in ReviewItemsIndex', sortedReviewArray)
    const spot = useSelector(state => state.spots.singleSpot)
    console.log('spot in ReviewItemsIndex', spot)

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
        dispatch(fetchReviewThunk(spotId))
    }, [dispatch, spotId])

    const buttonSwitch = (review) => {
        return user && user.id === review.userId ? <OpenModalButton buttonText='Delete' modalComponent={<DeleteReview reviewId={review.id} />}></OpenModalButton> : null
    }
    const rightRating = (spot) => {
        let rating = spot.avgStarRating
        if (rating === undefined || rating === null) {
            rating = "New"
            // console.log(' no rating', rating)
            return rating
        }
        else if (rating - Math.floor(rating) === 0) {
            // rating = `${rating}.,reviewArray.length0`
            // console.log('new rating', rating)
            return rating
        } else {
            // console.log('fixed rating', rating.toFixed(1))
            return rating.toFixed(1)
        }
    }
    const checkHowManyReviews = (sortedReviewArray) => {

        if (sortedReviewArray.length === 0) {
            return <p>&#9733; {rightRating(spot)}</p>
        } else if (sortedReviewArray === 1) {
            return <p>&#9733; {rightRating(spot)} &#8729; 1 Review</p>
        } else {
            return <p>&#9733;{rightRating(spot)} &#8729; {spot.numReviews}  Review</p>
        }
    }
    if (!spotIdObj && !spotId) return null
    return (
        <div className="review-container">
            {buttonSwitch(review)}
            {sortedReviewArray && checkHowManyReviews(sortedReviewArray)}
            {sortedReviewArray.map((review) => {
                // console.log("review in Map in ReviewItemIndex", review)
                return (
                    <div className="review-content-div">
                        <p className="review-User-name">{review.User.firstName}  {review.User.lastName}</p>
                        <p className="review-review">{review.review}</p>
                    </div>
                )
            })}
        </div>
    )


}

export default ReviewItemsIndex
