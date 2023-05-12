import { useModal } from "../../../../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview } from '../../../../../store/reviewsReducer';
import { useHistory } from "react-router-dom";

const DeleteFormModel = () => {

    // console.log('reviewId in DeleteModal')
    // const rightReviewId = reviewId.reviewId[0].id
    // console.log('reviewId in DeleteModal', reviewId.reviewId[0].id)

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        console.log('HANDLESUBMIT')
        dispatch(deleteReview()).then(closeModal);
        e.preventDefault()
    };

    const history = useHistory()

    const closeForm = (e) => {
        // e.preventDefault()
        closeModal()
        // history.push(`/spots/${spotId}`)
    }

    // if (!reviewId && !reviewId[0]) return null
    return (
        // <p>hello</p>
        <form className="delete-form-block" onSubmit={handleSubmit}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot
                from the listings?
            </p>
            <button type="submit" onClick={handleSubmit}>Yes (DELETE SPOT)</button>
            <button onClick={closeForm}>No (Keep Spot)</button>
        </form>


    )

}

export default DeleteFormModel
