import { useModal } from "../../../../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { createReview } from '../../../../../store/reviewsReducer';
import { useState } from "react";
// import { useHistory } from "react-router-dom";


const CreateReviewModel = (spot, review) => {
    // console.log('spot in modal', spot)
    // console.log('review in modal', spot.review)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // console.log(spot.spot)

    const [newReview, setNewReview] = useState('')
    const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)

    const createNewReview = {
        "userId": user.id,
        "spotId": spot.spot.id,
        "review": newReview,
        "stars": 1
    }

    const reviewOfUser = spot.review.find(rev => {
        console.log(rev)
        return rev.userId === user.id
    })
    // console.log('reviewOfUser', reviewOfUser)

    // console.log('new new new', createNewReview)

    const handleSubmit = (e) => {
        const err = {}
        console.log(reviewOfUser && user.id === reviewOfUser.userId)
        if (reviewOfUser && user.id === reviewOfUser.userId) err.user = 'Review already exists for this spot'

        setErrors(err)
        if (Object.values(err).length === 0) {
            // console.log('spot.spot.id', spot.spot.id)
            // console.log('newReview', newReview)
            dispatch(createReview(spot.spot.id, createNewReview)).then(closeModal);
        }else{
            e.preventDefault()
        }
    };


    if (!spot && !spot.id && !spot.review) return console.log('Hello')
    return (

        <form className="create-review-block" onSubmit={handleSubmit}>
            <p className="errors">{errors.user}</p>
            <h1>How was your stay</h1>
            <textarea placeholder="Leave your review here..." onChange={(e => setNewReview(e.target.value))}></textarea>
            <button type="submit" onClick={handleSubmit}>Submit Your Review</button>

        </form>


    )

}

export default CreateReviewModel
