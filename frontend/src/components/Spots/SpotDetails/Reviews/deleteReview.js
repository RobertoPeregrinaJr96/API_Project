import { useModal } from '../../../../context/Modal'
import { useDispatch } from 'react-redux'

import { deleteReviewThunk } from '../../../../store/reviewsReducer'

const DeleteReview = ({ spotId, reviewId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        await dispatch(deleteReviewThunk(reviewId)).then(closeModal)
    }

    const closeModalSubmit = (e) => {
        e.preventDefault();
        return closeModal()
    }

    return (
        <div className='delete-Modal-div'>
            <form className="delete-form-block" onSubmit={handleSubmit}>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to delete this review?   </p>
                <button type="submit" onClick={handleSubmit} className='yeah-delete'>Yes (Delete Review)</button>
                <button onClick={closeModalSubmit} className='dont-delete'>No (Keep Review)</button>
            </form>

        </div>
    )
}

export default DeleteReview;
