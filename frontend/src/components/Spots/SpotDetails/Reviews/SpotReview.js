import ReviewItems from "./ReviewItems"
import DeleteReview from './DeleteReview/DeleteReview'
import CreateReview from "./CreateReview/CreateReview"
import { useSelector } from "react-redux"



const SpotReview = ({ spot, reviews }) => {


    const user = useSelector(state => state.session.user)

    console.log('User in SpotReview', user)
    console.log('spot in SpotReview', spot)
    console.log('review in SpotReview', reviews)



    const stars = () => {
        const num = spot.avgStarRating
        // console.log('avgRating num ===>', num)
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = 0; i < Math.floor(num); i++) {
            arr.push(<li key={i}>&#9733;</li>)
        }
        return arr
    }


    const reviewArray = Object.values(reviews)
    console.log('reviewArray in SpotReview', reviewArray)

    const realReview = reviewArray.filter(review => {
        return spot.id === review.spotId
    })
    console.log('matching id in SpotReview', realReview)

    // to switch between showing create or delete
    const createOrDelete = () => {
        if (realReview) {
            console.log('YOU HAVE A REVIEW')
            return <DeleteReview reviewId={realReview[0].id} />
        } else {
            return <CreateReview spot={spot} review={realReview} />
        }
    }

    if (!spot && !spot.avgStarRating) return null
    return (
        <div>
            <div>
                <ul className='spot-review-stars'>{stars()}{spot.avgStarRating}</ul>
                <p>  Reviews{spot.numReviews}</p>
                <DeleteReview />
                <CreateReview spot={spot} review={realReview} />

            </div>
            <div>
                <ul>
                    {
                        realReview.map(rev => {
                            // { console.log('rev', rev) }
                            return <ReviewItems review={rev} />
                        })
                    }

                </ul>
            </div>
        </div>
    )
}


export default SpotReview
