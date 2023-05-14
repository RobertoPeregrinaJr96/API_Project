import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../../../context/Modal";

import { newReview } from "../../../../store/reviewsReducer";

const CreateReview = ({ reviewObj }) => {

    console.log('reviewObj in CreateReview', reviewObj)

    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [starHover, setStarHover] = useState(0)
    const [rating, setRating] = useState('')
    const [userId, setUserId] = useState('')
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)

    const spot = useSelector(state => state.spots.singleSpot)
    // console.log('spot in CreateReview', spot)

    const spotId = spot.id

    setUserId(user.id)

    const newReviewObj = {
        "review": review,
        "stars": rating
    }
    const handleSubmit = (e) => {
        console.log('newReviewObj in CreateReview dispatch', newReviewObj)
        console.log('spotId in CreateReview dispatch', spotId)
        console.log('userId in CreateReview dispatch', userId)
        e.preventDefault()
        dispatch(newReview(newReviewObj, spotId, userId)).then(closeModal())
        setStars('')
    }
    // if (reviewObj && user.id === userReview.userId) err.user = 'Review already exists for this spot'
    // let stateCheck = newReview.length >= 10
    // console.log('stateCheck', stateCheck)

    const onClickHandler = (rating) => {
        setStars(rating)
    }

    const starEvent = (num) => {
        if (num <= starHover) return "fa-solid fa-star fa-beat"
        if (num <= stars) return "fa-solid fa-star fa-beat"
        return "fa-solid fa-star"
    }
    useEffect(() => {
        if (stars) {
            const starRating = stars
            setRating(starRating)
        }
    }, [])
    return (
        <div>
            <form className="create-review-block" onSubmit={handleSubmit}>
                {/* <p className="errors">{errors.user}</p> */}
                <h1>How was your stay</h1>
                <textarea placeholder="Leave your review here..." onChange={(e => setReview(e.target.value))}></textarea>
                <div className="starW-rating-hover">

                </div>
                <button type="submit"  >Submit
                    Your Review</button>
                <i class="fa-regular fa-star"
                    onClick={onClickHandler(1)}
                    onMouseEnter={() => setStarHover(1)}
                    onMouseLeave={() => setStarHover(0)}
                    className={starEvent(1)}
                ></i>
                <i class="fa-regular fa-star"
                    onClick={onClickHandler(2)}
                    onMouseEnter={() => setStarHover(2)}
                    onMouseLeave={() => setStarHover(0)}
                    className={starEvent(2)}
                ></i>
                <i class="fa-regular fa-star"
                    onClick={onClickHandler(3)}
                    onMouseEnter={() => setStarHover(3)}
                    onMouseLeave={() => setStarHover(0)}
                    className={starEvent(3)}
                ></i>
                <i class="fa-regular fa-star"
                    onClick={onClickHandler(4)}
                    onMouseEnter={() => setStarHover(4)}
                    onMouseLeave={() => setStarHover(0)}
                    className={starEvent(4)}
                ></i>
                <i class="fa-regular fa-star"
                    onClick={onClickHandler(5)}
                    onMouseEnter={() => setStarHover(5)}
                    onMouseLeave={() => setStarHover(0)}
                    className={starEvent(5)}
                ></i>
            </form>
        </div>
    )

}

export default CreateReview
// disabled={!stateCheck}
