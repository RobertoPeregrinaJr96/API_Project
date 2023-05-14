import { useSelector } from 'react-redux'
import OpenModalButton from '../../../../OpenModalButton/index'
import DeleteFormModel from './DeleteReviewModal'

const DeleteSpot = ({ spotId, review }) => {
    console.log('spotId in DeleteReview', spotId)
    console.log('reviewId in DeleteReviews', review)


    return (
        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteFormModel spotId={spotId} review={review} />}></OpenModalButton>

    )
}

export default DeleteSpot
