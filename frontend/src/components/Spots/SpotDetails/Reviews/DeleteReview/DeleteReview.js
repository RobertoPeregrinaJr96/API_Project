import { useSelector } from 'react-redux'
import OpenModalButton from '../../../../OpenModalButton/index'
import DeleteFormModel from './DeleteReviewModal'

const DeleteSpot = ( ) => {
    console.log('DELETE THIS SPOT')
    // console.log('reviews in DeleteReviews', reviews)
    // let reviewId;
    // if (reviews.length) {
    //     reviewId = reviews[0].id
    //     console.log('review in DeleteReview', reviews[0])
    //     console.log('review in DeleteReview', reviewId)
    // }

    // if (!reviews && !reviews.length || reviews[0].id) return null
    return (
        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteFormModel />}></OpenModalButton>
        // <p>hello</p>
    )
}

export default DeleteSpot
