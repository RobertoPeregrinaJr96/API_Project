import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SpotIndexItem from './SpotIndexItem';
import { fetchSpotsThunk } from '../../../store/spotReducer';


const SpotIndex = () => {
    // console.log("SPOT INDEX")
    const spotsObj = useSelector(state => state.spots.allSpots)
    // console.log('spotsObj: ', spotsObj)
    const dispatch = useDispatch()

    const spots = Object.values(spotsObj)
    console.log("Spots : ", spots)


    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])



    if (!spotsObj) return null
    return (
        <div>
            <ul className='spots-ul'>
                {spots.map((spot) => {
                    return <SpotIndexItem
                        spot={spot}
                        key={spot.id}
                    />
                })}
            </ul>
        </div>
    )
}


export default SpotIndex
