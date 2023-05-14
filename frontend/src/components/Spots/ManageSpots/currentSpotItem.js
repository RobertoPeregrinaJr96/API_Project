import { useHistory } from "react-router-dom";
import DeleteSpot from './Delete_Spot'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CurrentSpotItems = (spot) => {
    const history = useHistory()
    // const dispatch = useDispatch()

    console.log('spot ====>', spot)
    // const { closeModal } = useModal();


    const rightRating = (spot) => {
        let rating = spot.avgRating
        if (rating === undefined || rating === null) {
            rating = "New"

            return rating
        }
        else if (rating - Math.floor(rating) === 0) {

            return rating
        } else {

            return rating.toFixed(1)
        }

    }
    const onUpdate = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.spot.id}/edit`)
    }

    // const onDelete = (e) => {
    //     <DeleteSpot spot={spot.spot} />

    //     // dispatch(deleteSpot(spot.spot.id))

    //     history.push('/spots/current')
    // };


    return (
        <li key={spot.spot.id} className='current-spot-list'>
            <div className='current-spot-list-block tool-tip'>
                <span className='tool-tip-text'>{spot.spot.name}</span>
                <Link exact to={`/spots/${spot.spot.id}`}>

                    <img src={spot.spot.previewImage} alt='di'></img>
                    <br></br>
                    {spot.spot.name}{'  '}
                    {spot.spot.city}{'  '}
                    {spot.spot.state}<br></br>
                    ${spot.spot.price}/night
                    <ul className='spot-review-stars'>{rightRating(spot)}</ul>
                </Link>
                <div>
                    <button onClick={onUpdate}>Update</button>
                    <DeleteSpot spot={spot.spot} />

                </div>
            </div>
        </li >
    )
}


export default CurrentSpotItems
