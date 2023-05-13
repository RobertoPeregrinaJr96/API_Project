import { useModal } from "../../../../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createReview } from '../../../../../store/reviewsReducer';
import { useState } from "react";
// import { useHistory } from "react-router-dom";


const CreateReviewModel = ({ spot }) => {
    // console.log('spot in modal', spot)

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [newReview, setNewReview] = useState('')
    const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)
    // console.log('user in CreateModal', user)

    const reviewsObj = useSelector(state => state.reviews.spot)
    // console.log('reviewsObj in modal', reviewsObj)

    const reviewArray = Object.values(reviewsObj)
    // console.log('reviewArray in Create Modal', reviewArray)

    const userReview = reviewArray.find(value => value.userId === user.id)
    // console.log('userReview of Create modal', userReview)

    const createNewReview = {
        "userId": user.id,
        "spotId": spot.id,
        "review": newReview,
        "stars": 1
    }


    const handleSubmit = (e) => {
        const err = {}
        // console.log('test user.id', user.id)
        // console.log('test userReview.userId', userReview.userId)

        if (userReview && user.id === userReview.userId) err.user = 'Review already exists for this spot'

        setErrors(err)
        if (Object.values(err).length === 0) {
            // console.log('spot.spot.id', spot.spot.id)
            // console.log('newReview', newReview)
            e.preventDefault()
            dispatch(createReview(spot.id, createNewReview)).then(closeModal);
        } else {
            e.preventDefault()
        }
    };

    let stateCheck = newReview.length >= 10
    console.log('stateCheck', stateCheck)

    if (!spot && !spot.id) return null
    return (

        <form className="create-review-block" onSubmit={handleSubmit}>
            <p className="errors">{errors.user}</p>
            <h1>How was your stay</h1>
            <textarea placeholder="Leave your review here..." onChange={(e => setNewReview(e.target.value))}></textarea>
            <button disabled={!stateCheck} type="submit"  >Submit Your Review</button>

        </form>


    )

}

export default CreateReviewModel
