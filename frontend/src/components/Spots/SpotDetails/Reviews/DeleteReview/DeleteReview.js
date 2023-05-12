import OpenModalButton from '../../../../OpenModalButton/index'
import DeleteFormModel from './DeleteReviewModal'

const DeleteSpot = ({ reviewId }) => {
    console.log('DELETE THIS SPOT')
    // console.log('spot ===>', spot)

    return (
        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteFormModel reviewId={reviewId} />}></OpenModalButton>

    )
}

export default DeleteSpot
