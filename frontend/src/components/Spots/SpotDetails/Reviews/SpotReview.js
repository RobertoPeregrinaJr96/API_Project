import ReviewItems from "./ReviewItems"
import DeleteReview from './DeleteReview/DeleteReview'
import CreateReview from "./CreateReview/CreateReview"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchReviewThunk } from "../../../../store/reviewsReducer"
const SpotReview = ({ spot, reviews }) => {
    // console.log('spot in SpotReview', spot)
    // console.log('reviews in SpotReviews', reviews)
    const spotId = spot.id

    const dispatch = useDispatch()

    let reviewArray;

    if (reviews) reviewArray = Object.values(reviews)

    useEffect(() => {
        dispatch(fetchReviewThunk(spotId))
    }, [dispatch, Object.values(reviews).length, spotId])
    const list = (reviewArray) => {
        if (reviewArray.length !== 0) {
            return reviewArray.map(rev => {
                // {console.log('rev', rev)}
                return <ReviewItems review={rev} />
            })

        }
    }


    const rightRating = (spot) => {
        let rating = spot.avgStarRating
        if (rating === undefined || rating === null) {
            rating = "New"
            // console.log(' no rating', rating)
            return rating
        }
        else if (rating - Math.floor(rating) === 0) {
            rating = `${rating}.0`
            // console.log('new rating', rating)
            return rating
        } else {
            // console.log('fixed rating', rating.toFixed(1))
            return rating.toFixed(1)
        }
    }

    const user = useSelector(state => state.session.user)
    // console.log('user in SpotReview', user)

    const showButton = (reviewArray) => {
        if (reviewArray !== 0) {
            let arr = reviewArray.find(review => review.userId === user.id)
            // console.log('arr in SpotReview', arr)
            if (!arr)  return <CreateReview spot={spot} />
            else {
                return <DeleteReview spotId={spot.id} review={arr} />
            }
        }

    }

    const checkHowManyReviews = (reviews) => {

        if (Object.values(reviews).length === 0) {
            return <p>s{rightRating(spot)}  0 Review</p>
        } else if (Object.values(reviews).length === 1) {
            return <p>&#9733; {rightRating(spot)} &#8729; 1 Review</p>
        } else {
            return <p>&#9733;{rightRating(spot)} &#8729; {spot.numReviews}  Review</p>
        }
    }


    if (!spot && !spot.id) return null


    if (!spot && !spot.id && !spot.ownerId) return null
    return (
        <div>
            <div>
                <ul className='spot-review-stars'> { }</ul>
                {reviews && checkHowManyReviews(reviews)}
                <p>  Reviews  {spot.numReviews}</p>
                {showButton(reviewArray)}
                {/* <CreateReview spot={spot} reviews={reviewArray} /> */}
                {/* <DeleteReview reviewId={4} /> */}
            </div>
            <div>

                {list(reviewArray)}

            </div>
        </div>
    )
}


export default SpotReview
