import OpenModalButton from '../../../OpenModalButton/index'
import DeleteSpotModel from './DeleteSpotModal'

const DeleteSpot = ({ spot }) => {
    console.log('DELETE THIS SPOT')
    // console.log('spot ===>', spot)

    return (
        <OpenModalButton buttonText={'Delete'} modalComponent={<DeleteSpotModel spot={spot} />}></OpenModalButton>

    )
}

export default DeleteSpot
