import OpenModalButton from '../../../../OpenModalButton/index'
import CreateReviewModel from './CreateReviewModal'

const CreateReview = ({ spot,review }) => {
    console.log('Create your review')
    // console.log('spot ===>', spot)

    return (
        <OpenModalButton buttonText={'Post Your Review'} modalComponent={<CreateReviewModel spot={spot} review={review}/>}></OpenModalButton>

    )
}

export default CreateReview
