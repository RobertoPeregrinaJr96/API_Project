import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "../../../../context/Modal";

import { newReview } from "../../../../store/reviewsReducer";

const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [rating, setRating] = useState('')
    const [userId, setUserId] = useState('')

    const user = useSelector(state => state.session.user)
    setUserId(user.id)

    useEffect(() => {
        if (stars) {
            const starRating = stars
            setRating(starRating)
        }
    }, [stars])

    const newReviewObj = {
        "review": review,
        "stars": rating
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(newReview(newReviewObj, spotId, userId)).then(closeModal())
        setStars('')
    }

    const onClickHandler = (rating) => {
        setStars(rating)
    }

    const starEvent = (num) => {
        if (num <= hoverNumber) return "fa-solid fa-star fa-beat"
        if (num <= stars) return "fa-solid fa-star fa-beat"
        return "fa-solid fa-star"
    }
    return (
        <div>
            <form className="create-review-block" onSubmit={handleSubmit}>
                <p className="errors">{errors.user}</p>
                <h1>How was your stay</h1>
                <textarea placeholder="Leave your review here..." onChange={(e => setReview(e.target.value))}></textarea>
                <button disabled={!stateCheck} type="submit"  >Submit Your Review</button>

            </form>
        </div>
    )

}

export default CreateReview
