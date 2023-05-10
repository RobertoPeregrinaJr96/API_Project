import { useDispatch } from "react-redux"
import { useModal } from "../../../../context/Modal"
import { deleteSpot } from "../../../../store/spotReducer";


const DeleteSpot = ({ spot }) => {
    console.log('DELETE THIS SPOT')
    console.log('spot ===>', spot)
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const closeModalSubmit = (e) => {
        e.preventDefault();
        return closeModal();
    };

    const handleSubmit = (e) => {
        console.log('spot.spot.id')
        // dispatch(dispatch(deleteSpot(spot.id))).then(closeModal);
    };

    return (
        <form className="delete-form-block" onSubmit={handleSubmit}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot
                from the listings?
            </p>
            <button type="submit">Yes (DELETE SPOT)</button>
            <button onClick={closeModalSubmit}>No (Keep Spot)</button>

        </form>
    )
}

export default DeleteSpot
