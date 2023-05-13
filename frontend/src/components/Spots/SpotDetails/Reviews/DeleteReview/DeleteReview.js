import { useSelector } from 'react-redux'
import OpenModalButton from '../../../../OpenModalButton/index'
import DeleteFormModel from './DeleteReviewModal'

const DeleteSpot = ({ spotId, reviewId }) => {
    console.log('DeleteReview')
    console.log('reviewId in DeleteReviews', reviewId)


    return (
        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteFormModel spotId={spotId} reviewId={reviewId} />}></OpenModalButton>

    )
}

export default DeleteSpot
