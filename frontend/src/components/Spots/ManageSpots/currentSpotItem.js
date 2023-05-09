import { useHistory } from "react-router-dom";
// import DeleteSpot from "./Delete_Spot/DeleteSpot";
// import { useModal } from "../../../context/Modal";
import { deleteSpot } from "../../../store/spotReducer";
import { useDispatch } from 'react-redux';


const CurrentSpotItems = (spot) => {
    const history = useHistory()
    const dispatch = useDispatch()

    // // console.log('spot ====>', spot.spot.id)
    // const { closeModal } = useModal();



    const stars = () => {
        const num = spot.spot.avgRating
        const arr = []
        if (num === null || num === undefined) return ''
        for (let i = num; i <= 5; i++) {
            arr.push(<li key={i}>&#9733;</li>)
        }
        return arr
    }

    const onUpdate = (e) => {
        // e.preventDefault();
        history.push(`/spots/${spot.spot.id}/edit`)
    }

    const onDelete = (e) => {
        // <DeleteSpot />

        dispatch(deleteSpot(spot.spot.id))

        history.push('/spots/current')
    };


    return (
        <li key={spot.spot.id} className='current-spot-list'>
            <div className='current-spot-list-block'>
                <img src={'https://cdn.discordapp.com/attachments/1088906268485357618/1105152225992507502/gettyimages-1269776313-612x612.jpg'} alt='di'></img>
                <br></br>
                {spot.spot.name}{'  '}
                {spot.spot.city}{'  '}
                {spot.spot.state}<br></br>
                ${spot.spot.price}/night
                <ul className='spot-review-stars'>{stars()}</ul>
                <div>
                    <button onClick={onUpdate}>Update</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </li >
    )
}


export default CurrentSpotItems
