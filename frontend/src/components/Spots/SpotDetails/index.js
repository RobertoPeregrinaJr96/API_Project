import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SpotImages from './SpotImages'
import DetailsForSpot from './detailsForSpot';
import './index.css'

import { fetchDetailedSpotThunk } from '../../../store/spotReducer'
import ReviewItemsIndex from './Reviews/index'

const SpotById = () => {
    const dispatch = useDispatch()
    const spotIdObj = useParams()
    // console.log("spotIdObj in Spot Details Index", spotIdObj)
    const spotId = Number(spotIdObj.id)
    // console.log("SpotId in Spot Details Index", spotId)
    const spot = useSelector((state) => { return state.spots.singleSpot })
    // console.log("spot in Spot Details Index", spot)
    const reviews = useSelector((state) => { return state.reviews.spot })
    // console.log("reviews in Spot Details Index", reviews)

    const bookingAlert = () => {
        window.alert('Feature Coming Soon...')
    }

    const history = useHistory()

    const rightRating = (spot) => {
        let rating = spot.avgStarRating
        if (rating === undefined || rating === null) {
            rating = "New"
            // console.log(' no rating', rating)
            return rating
        }
        else if (rating - Math.floor(rating) === 0) {
            // rating = `${rating}.,reviewArray.length0`
            // console.log('new rating', rating)
            return rating
        } else {
            // console.log('fixed rating', rating.toFixed(1))
            return rating.toFixed(1)
        }
    }


    // console.log("SpotId in Spot Details Index")
    // let reviewArray;
    // if (!!Object.values(reviews).length) {
    //     const arr = (Object.values(reviews))
    //     reviewArray = arr.filter(review => {
    //         return review.spotId === spot.id
    //     })

    // }


    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
        // history.push(`/spots/${spotId}`)
        console.log("DING DING DING useEffect RENDER-------------------------------")
    }, [dispatch, spotId,Object.values(reviews).length])

    const checkReviews = (reviews) => {
        // console.log("reviews in checkReviews in Spot Detail Index", reviews)
        if (Object.values(reviews).length === 0) return <p className='no-reviews'>Be the first to post a review!</p>
        else {
            return <ul className='spot-reviews-list'>
            </ul>
        }
    }
    // console.log("reviews in checkReviews ===> ", reviews)
    // console.log("reviews in checkReviews ===> ", reviews)
    // console.log("reviews in checkReviews ===> ", reviews)

    const checkNumOfReviews = (reviews) => {
        if (Object.values(reviews).length === 0) {
            return null
        } else if (Object.values(reviews).length === 1) {
            return <p>  · {spot.numReviews} review</p>
        } else {
            return <p>  · {spot.numReviews} reviews</p>
        }
    }

    if (!(spot && spot.name) || (!reviews && Object.values(reviews).length)) return null
    return (
        <div >
            <h1>{spot.name}</h1>
            <ul className='spot-images-list'>
                {<SpotImages spot={spot} />}
            </ul>
            <div className='spot-detailed-info'>
                <DetailsForSpot spot={spot} />

                <div className='booking-div'>
                    <div className='booking-content'>

                        ${spot.price} night
                        <p className='spot-review-stars'> &#9733;{rightRating(spot)} {reviews && checkNumOfReviews(reviews)}</p>
                        <br></br>
                    </div>
                    <button name='alert-button' className='alert-button' onClick={bookingAlert}>
                        <label className='alert-button-label' for="alert-button">Reserve</label>

                    </button>
                </div>
            </div>
            {reviews && checkReviews(reviews)}
            <ReviewItemsIndex />



        </div>
    )

}


export default SpotById
