import { useHistory } from "react-router-dom";
// import DeleteSpot from "./Delete_Spot/DeleteSpot";
// import { useModal } from "../../../context/Modal";
// import { deleteSpot } from "../../../store/spotReducer";
// import { useDispatch } from 'react-redux';
import DeleteSpot from './Delete_Spot/DeleteSpot'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CurrentSpotItems = (spot) => {
    const history = useHistory()
    // const dispatch = useDispatch()

    // // console.log('spot ====>', spot.spot.id)
    // const { closeModal } = useModal();

    const stars = () => {
        const num = spot.spot.avgRating
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = 0; i < Math.floor(num); i++) {
            arr.push(<li key={i}>&#9733;</li>)
        }
        return arr
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
                    <ul className='spot-review-stars'>{stars()}</ul>
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
