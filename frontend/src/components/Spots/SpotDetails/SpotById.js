import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDetailedSpotThunk } from '../../../store/spotReducer'
import SpotImages from './SpotImages'

import { fetchReviewThunk } from '../../../store/reviewsReducer';
import SpotReview from './Reviews/SpotReview'

import DetailsForSpot from './detailsForSpot';


const SpotById = () => {
    const dispatch = useDispatch()
    // console.log("Spot Id")
    const spotIdObj = useParams()
    // console.log('spotIdObj ===>', spotIdObj)
    const spotId = Number(spotIdObj.id)
    // console.log('spotId ====>', spotId)
    const spot = useSelector((state) => { return state.spots.singleSpot })
    console.log('spot  in SpotByID==>', spot)
    const reviews = useSelector((state) => { return state.reviews.spot })
    console.log("reviews in SpotById ===> ", reviews)
    const currentReview = reviews[0]
    console.log('currentReview in SPotByID', currentReview)

    const bookingAlert = () => {
        window.alert('Feature Coming Soon...')
    }

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
    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        console.log('spotId in useEffect in SpotById', spotId)
        dispatch(fetchReviewThunk(spotId))
    }, [dispatch, spotId])


    if (spot && spot.name || reviews && Object.values(reviews).length) {
        return (
            <div>
                <h1>{spot.name}</h1>
                <ul className='spot-images-list'>
                    {<SpotImages spot={spot} />}
                </ul>
                <div className='spot-detailed-info'>
                    <DetailsForSpot spot={spot} />
                    <div>
                        ${spot.price} night
                        <ul className='spot-review-stars'>{stars()}{spot.avgStarRating}</ul>
                        reviews{spot.numReviews}
                        <br></br>
                        <button className='alert-button' onClick={bookingAlert}>
                            Reserve
                        </button>
                    </div>
                </div>
                <ul className='spot-reviews-list'>
                    <SpotReview spot={spot} reviews={reviews} />

                </ul>


            </div>
        )
    }
}


export default SpotById
