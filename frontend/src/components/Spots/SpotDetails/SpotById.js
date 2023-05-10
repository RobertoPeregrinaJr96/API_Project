import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDetailedSpotThunk } from '../../../store/spotReducer'
import SpotImages from './SpotImages'

// import { fetchReviewThunk } from '../../../store/reviewsReducer';
// import SpotReview from './SpotReview'

const SpotById = () => {
    const dispatch = useDispatch()
    // console.log("Spot Id")
    const spotIdObj = useParams()
    // console.log('spotIdObj ===>', spotIdObj)
    const spotId = Number(spotIdObj.id)
    // console.log('spotId ====>', spotId)
    const spot = useSelector((state) => { return state.spots.singleSpot })
    // console.log('spot ==>', spot)

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
    }, [dispatch, spotId])


    // useEffect(() => {
    //     dispatch(fetchReviewThunk())
    // }, [dispatch, spotId])

    // const reviews = useSelector((state) => { return state.reviews })
    // // console.log("reviews ===> ", reviews)

    if (spot && spot.name) {
        return (
            <>
                <h1>{spot.name}</h1>
                <ul className='spot-images-list'>
                    {<SpotImages spot={spot} />}
                </ul>
                {/* <ul className='spot-reviews-list'>
                    <SpotReview spotId={spot.id} />

                </ul> */}


            </>
        )
    }
}


export default SpotById
