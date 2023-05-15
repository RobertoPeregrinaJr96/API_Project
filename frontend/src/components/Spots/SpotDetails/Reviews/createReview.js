import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../../../context/Modal";

import { createReviewThunk, fetchReviewThunk } from "../../../../store/reviewsReducer";
import './index.css'
const CreateReview = ({ spotId }) => {

    // console.log('spotId in CreateReview', spotId)

    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [newReview, setReview] = useState('')
    const [starHover, setStarHover] = useState(1)
    const [rating, setRating] = useState(1)

    const user = useSelector(state => state.session.user)
    // console.log('user in CreateReview', user)
    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in CreateReview', spot)
    const reviews = useSelector(state => state.reviews.spot)
    // console.log('reviews in CreateReview', reviews)

    const reviewArray = Object.values(reviews)
    const err = {}
    if (reviewArray.length !== 0) {
        // console.log('reviewArray in CreateReview ', reviewArray)

        reviewArray.forEach(rev => {
            if (rev && user && (user.id === rev.userId)) err.hasAExistingReview = 'Review already exists for this spot'
        })
    }

    // disable the submit button if it has less than 10 characters
    let isDisabled = true;
    console.log(newReview.length)
    if (newReview.length >= 10 && Object.values(err).length === 0) {
        isDisabled = false
    }
    console.log('isDisable', isDisabled)

    const handleSubmit = (e) => {
        // console.log('newReviewObj in CreateReview dispatch', newReviewObj)

        const newReviewObj = {
            "review": newReview,
            "stars": rating
        }
        // console.log('newReviewOBj in CreateReview', newReviewObj)

        if (Object.values(err).length === 0) {
            e.preventDefault()
            // console.log('spotId in CreateReview dispatch', spotId)
            // console.log('userId in CreateReview dispatch', newReviewObj)
            dispatch(createReviewThunk(newReviewObj, spotId))
        }
        // e.preventDefault()
        closeModal()
    }

    const starEvent = (num) => {
        if (num <= rating) return "fa-solid fa-star fa-beat"
        if (num <= starHover) return "fa-solid fa-star fa-beat"
        return "fa-regular fa-star"
    }

    useEffect(() => {
        dispatch(fetchReviewThunk())
    }, [dispatch])

    return (
        <div>
            <form className="create-review-block" onSubmit={handleSubmit}>
                <p className="errors">{err.hasAExistingReview}</p>
                <h1 className="create-h1">How was your stay?</h1>
                <textarea className="create-textarea" placeholder="Leave your review here..." onChange={(e => setReview(e.target.value))}></textarea>
                <div className="starW-rating-hover">

                </div>
                {/* star : hover : rating */}
                <div className="stars">
                    <i class="fa-regular fa-star"
                        style={{ color: '#e1d700', fontSize: '30px' }}
                        onClick={() => setRating(1)}
                        onMouseEnter={() => setStarHover(1)}
                        onMouseLeave={() => setStarHover(0)}
                        className={starEvent(1)}
                    ></i>

                    <i class="fa-regular fa-star"
                        style={{ color: '#e1d700', fontSize: '30px' }}
                        onClick={() => setRating(2)}
                        onMouseEnter={() => setStarHover(2)}
                        onMouseLeave={() => setStarHover(0)}
                        className={starEvent(2)}
                    ></i>

                    <i class="fa-regular fa-star"
                        style={{ color: '#e1d700', fontSize: '30px' }}
                        onClick={() => setRating(3)}
                        onMouseEnter={() => setStarHover(3)}
                        onMouseLeave={() => setStarHover(0)}
                        className={starEvent(3)}
                    ></i>

                    <i class="fa-regular fa-star"
                        style={{ color: '#e1d700', fontSize: '30px' }}
                        onClick={() => setRating(4)}
                        onMouseEnter={() => setStarHover(4)}
                        onMouseLeave={() => setStarHover(0)}
                        className={starEvent(4)}
                    ></i>

                    <i class="fa-regular fa-star"
                        style={{ color: '#e1d700', fontSize: '30px' }}
                        onClick={() => setRating(5)}
                        onMouseEnter={() => setStarHover(5)}
                        onMouseLeave={() => setStarHover(0)}
                        className={starEvent(5)}
                    ></i>
                    {'   '}
                    stars
                </div>
                <button type="submit" disabled={!!isDisabled} className="create-button">Submit
                    Your Review</button>
            </form>
        </div>
    )

}

export default CreateReview
// disabled={!stateCheck}
