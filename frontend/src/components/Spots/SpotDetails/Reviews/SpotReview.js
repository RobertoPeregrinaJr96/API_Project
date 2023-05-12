import ReviewItems from "./ReviewItems"
import DeleteReview from './DeleteReview/DeleteReview'
import CreateReview from "./CreateReview/CreateReview"
import { useSelector } from "react-redux"



const SpotReview = ({ spot, reviews }) => {

    // console.log('Spot Reviews')
    // console.log('spot on Reviews ===>', spot.id)
    // console.log('reviews on Reviews ====>', reviews.spot)

    const reviewsArray = [...Object.values(reviews)]
    // console.log('review Array', reviewsArray)

    const user = useSelector(state => state.session.user)

    const stars = () => {
        const num = spot.avgStarRating
        // console.log('avgRating num ===>', num)
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = 0; i < Math.floor(num); i++) {
            arr.push(<li key={i}>&#9733;</li>)
        }
        // console.log(arr)
        return arr
    }
    // let i = 0

    const realReview = reviewsArray.filter(review => {
        // console.log('con review==>', review.id)
        // console.log('con spot',spot.id)
        return spot.id === review.spotId
    })

    // let yourReview;
    // let yourReviewId;
    // if (realReview) {
    //     yourReview = realReview.find(review => review.userId === user.id)
    //     console.log('Hello', yourReview)
    //     yourReviewId = yourReview.id
    //     console.log('world', yourReviewId)

    // }

    // const createOrDelete = () => {

    //     if (yourReview) {
    //         console.log('YOU HAVE A REVIEW')
    //         return <DeleteReview reviewId={yourReview.id} />
    //     } else {
    //         return <CreateReview spot={spot} review={realReview} />
    //     }
    // }

    console.log(spot.numReviews)
    if (!spot && !spot.avgStarRating) return null
    // if (!yourReview && !yourReviewId) return null
    return (
        <div>
            <div>
                <ul className='spot-review-stars'>{stars()}{spot.avgStarRating}</ul>
                <p>  Reviews{spot.numReviews}</p>
                {/* {createOrDelete} */}
                <DeleteReview reviewId={7} />
                <CreateReview spot={spot} review={realReview} />

            </div>
            <div>
                <ul>
                    {
                        realReview.map(rev => {
                            return <ReviewItems review={rev} />
                        })
                    }

                </ul>
            </div>
        </div>
    )
}


export default SpotReview
