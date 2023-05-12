import { useModal } from "../../../../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview } from '../../../../../store/reviewsReducer';
import { useHistory } from "react-router-dom";

const DeleteFormModel = (reviewId) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        dispatch(deleteReview(reviewId)).then(closeModal);
        // e.preventDefault()
    };

    // const history = useHistory()

    const closeForm = (e) => {
        e.preventDefault()
        closeModal()
        // history.push(`/spots/current`)
    }

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
