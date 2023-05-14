


const DetailsForSpot = ({ spot }) => {



    return (
        <div >
            <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
            <p>{spot.description}</p>

        </div>
    )

}


export default DetailsForSpot
