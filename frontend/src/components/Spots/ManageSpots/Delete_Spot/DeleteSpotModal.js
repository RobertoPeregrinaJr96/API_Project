import { useModal } from "../../../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteSpot, fetchSpotsThunk } from "../../../../store/spotReducer";
// import { useHistory } from "react-router-dom";
import './index.css'
import { useEffect } from "react";

const DeleteFormModel = (spot) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log(spot.spot)


    const handleSubmit = (e) => {
        // console.log('spot.spot.id')
        e.preventDefault()
        return dispatch(deleteSpot(spot.spot.id)).then(closeModal);
    };

    // const history = useHistory()

    const closeForm = (e) => {
        // e.preventDefault()
        closeModal()
        // history.push(`/spots/current`)
    }

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch, spot])

    return (
        <div className='delete-Modal-div'>
            <form className='delete-form-block' onSubmit={handleSubmit}>
                <h1 className='delete-header'>Confirm Delete</h1>
                <p className='delete-p'>Are you sure you want to remove this spot from the listings?
                </p>
                <div className="button-div">
                    <button type="submit" onClick={handleSubmit} className='yeah-delete'>Yes (DELETE SPOT)</button>

                    <button onClick={closeForm} className='dont-delete'>No (Keep Spot)</button>
                </div>
            </form>

        </div >
    )

}

export default DeleteFormModel
