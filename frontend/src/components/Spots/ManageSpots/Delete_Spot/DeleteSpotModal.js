import { useModal } from "../../../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteSpot } from "../../../../store/spotReducer";
import { useHistory } from "react-router-dom";


const DeleteFormModel = (spot) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log(spot.spot)
    const handleSubmit = (e) => {
        console.log('spot.spot.id')
        dispatch(dispatch(deleteSpot(spot.spot.id))).then(closeModal);
    };

    const history = useHistory()

    const closeForm = (e) => {
        e.preventDefault()
        closeModal()
        history.push(`/spots/current`)
    }

    return (

        <form className="delete-form-block" onSubmit={handleSubmit}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot
                from the listings?
            </p>
            <button type="submit" onClick={handleSubmit}>Yes (DELETE SPOT)</button>
            <button onClick={closeForm}>No (Keep Spot)</button>
        </form>


    )

}

export default DeleteFormModel
