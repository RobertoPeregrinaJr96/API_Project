import ReviewItems from "./ReviewItems"
import DeleteReview from './DeleteReview/DeleteReview'
import CreateReview from "./CreateReview/CreateReview"
import { useSelector } from "react-redux"

const SpotReview = ({ spot, reviews }) => {

    console.log('spot in SpotReview', spot)
    console.log('reviews in SpotReviews', reviews)

    let reviewArray;

    if (reviews) reviewArray = Object.values(reviews)

    const list = (reviewArray) => {
        if (reviewArray.length !== 0) {
            return reviewArray.map(rev => {
                // {console.log('rev', rev)}
                return <ReviewItems review={rev} />
            })

        }
    }

    const user = useSelector(state => state.session.user)
    console.log('user in SpotReview', user)

    const showButton = (reviewArray) => {
        if (reviewArray !== 0) {
            let arr = reviewArray.find(review => review.userId === user.id)
            console.log('arr in SpotReview', arr)
            if (!arr) return null
            else {
                return <DeleteReview reviewId={arr[0].id} />
            }
        }

        return <CreateReview spot={spot} />
    }




    if (!spot && !spot.id && !spot.ownerId) return null
    return (
        <div>
            <div>
                <ul className='spot-review-stars'> {spot.avgStarRating}</ul>
                <p>  Reviews  {spot.numReviews}</p>
                {/* {showButton(reviewArray)} */}
                <CreateReview spot={spot} reviews={reviewArray}/>
            </div>
            <div>
                <ul>
                    {list(reviewArray)}
                </ul>
            </div>
        </div>
    )
}


export default SpotReview
