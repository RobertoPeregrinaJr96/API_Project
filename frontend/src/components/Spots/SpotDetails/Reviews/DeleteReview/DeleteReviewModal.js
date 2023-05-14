import { useModal } from "../../../../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview } from '../../../../../store/reviewsReducer';
import { useHistory } from "react-router-dom";

const DeleteFormModel = ({ spotId, review }) => {

    console.log('review in DeleteModal', review)
    console.log('spotId in DeleteModal', spotId)

    const reviewId = review?.id

    const history = useHistory()

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // const user = useSelector(state => state.session.user)
    // console.log('user in DeleteModal', user)

    const handleSubmit = (e) => {
        // e.preventDefault()
        dispatch(deleteReview(reviewId)).then(closeModal);
        history.push(`/spots/${spotId}`)
    };

    // const history = useHistory()

    const closeForm = (e) => {
        // e.preventDefault()
        closeModal()
        // history.push(`/spots/${spotId}`)
    }

    // if (!reviewId && !reviewId[0]) return null
    return (
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
