import OpenModalButton from '../../../../OpenModalButton/index'
import CreateReviewModel from './CreateReviewModal'

const CreateReview = ({ spot,reviews }) => {
    // console.log('Create your review in CreateReview')
    // console.log('spot in CreateReview ===>', spot)


    if (!spot && !spot.id) return false
    return (
        <OpenModalButton buttonText={'Post Your Review'} modalComponent={<CreateReviewModel spot={spot} />}></OpenModalButton>

    )
}

export default CreateReview
