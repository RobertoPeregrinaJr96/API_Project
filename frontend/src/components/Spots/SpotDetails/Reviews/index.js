import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchReviewThunk } from "../../../../store/reviewsReducer";
import OpenModalButton from '../../../OpenModalButton/index'
import DeleteReviewModal from "./deleteReview";
import { fetchDetailedSpotThunk } from "../../../../store/spotReducer";
import CreateReview from "./createReview";

import './index.css'

const ReviewItemsIndex = () => {

    const dispatch = useDispatch();
    const spotIdObj = useParams()
    // console.log('spotIdObj in ReviewItemsIndex', spotIdObj)
    const spotId = spotIdObj.id
    // console.log('spotId in ReviewItemsIndex', spotId)

    const user = useSelector(state => state.session.user)
    // console.log('user in ReviewItemsIndex', user)

    const review = useSelector(state => state.reviews.spot)
    // console.log('review in ReviewItemsIndex', review)
    const reviewArray = Object.values(review)
    // console.log('reviewArray in ReviewItemsIndex', reviewArray)
    const sortedReviewArray = reviewArray.sort((a, b) => {
        // console.log(a.createdAt)
        // console.log(new Date(a.createdAt))
        // console.log(b)
        console.log(new Date(b.createdAt))
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    console.log('sortedReviewArray in ReviewItemsIndex', sortedReviewArray)
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in ReviewItemsIndex', spot)

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
        dispatch(fetchReviewThunk(spotId))

    }, [dispatch, spotId, reviewArray.length])

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

        if (sortedReviewArray && sortedReviewArray?.length === 0) {
            return <p>&#9733; {rightRating(spot)}</p>
        } else if (sortedReviewArray === 1) {
            return <p>&#9733; {rightRating(spot)} &#8729; 1 Review</p>
        } else {
            return <p>&#9733;{rightRating(spot)} &#8729; {spot.numReviews}  reviews</p>
        }
    }


    const userReview = (review, user) => {
        if (user?.id === undefined) return null
        if (review?.User?.id === user?.id) {
            console.log("review in userReview", review)
            console.log("user in userReview", user)
            return < OpenModalButton buttonText={'Delete'} modalComponent={< DeleteReviewModal reviewObj={review} />}></OpenModalButton >
        }
    }
    // return <OpenModalButton buttonText={'Post Your Review'} modalComponent={<CreateReview spotId={spotId} />}></OpenModalButton>



    const noUserReview = (sortedReviewArray, user) => {
        const arr = sortedReviewArray.filter(review => {
            return review?.User?.id == user?.id
        })
        console.log('arr', arr)
        if (arr.length === 0) {
            console.log('arr === 0', arr.length)
            if (!user) return null
            return <OpenModalButton buttonText={'Post Your Review'} modalComponent={<CreateReview spotId={spotId} />}></OpenModalButton>
        } else return null
    }


    if (!spotIdObj && !spotId) return null
    return (
        <div className="review-container">
            {noUserReview(sortedReviewArray, user)}
            {sortedReviewArray && checkHowManyReviews(sortedReviewArray)}
            {
                sortedReviewArray.map((review) => {
                    // console.log("review in Map in ReviewItemIndex", review)
                    let month = new Date(review.createdAt).toDateString().split(' ')
                    let year = new Date(review.createdAt).getFullYear();
                    return (
                        <div className="review-content-div">
                            <p className="review-User-name">{review?.User?.firstName} {'  '} {review?.User?.lastName}</p>
                            <p> {`${month[1]} ${year}`}</p>
                            <p className="review-review">{review.review}</p>
                            {userReview(review, user)}
                        </div>
                    )
                })
            }
        </div >
    )


}

export default ReviewItemsIndex
