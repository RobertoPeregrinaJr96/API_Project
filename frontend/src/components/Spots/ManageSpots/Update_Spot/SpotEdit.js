import { useState, useEffect } from "react"
import { updateSpot } from "../../../../store/spotReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { fetchDetailedSpotThunk } from '../../../../store/spotReducer'



const UpdateSpot = () => {

        const spot = useSelector((state) => { return state.spots.singleSpot })


    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);

    // const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)
    // console.log('user ===>', user)
    // console.log('address', address)
    // console.log('city', city)
    // console.log('state', state)
    // console.log('country', country)
    // console.log('describe', describe)
    // console.log('name', name)
    // console.log('price', price)

    const dispatch = useDispatch();
    const idObj = useParams()
    const id = idObj.id
    const history = useHistory()


    const spotEdit = {
        'id': id,
        'address': address,
        'city': city,
        'state': state,
        'country': country,
        'description': description,
        'name': name,
        'price': price,
        'ownerId': user.id,
        'lat': -75.67382,
        'lng': -132.31456
    }


    const onsubmit = async (e) => {
        e.preventDefault()
        console.log('spotEdit ===>', spotEdit)
        const spot = await dispatch(updateSpot(spotEdit))
        console.log("Updated Spot ====>", spot)
        history.push('/spots/current')
    }

    const spotId = Number(id)

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
    }, [dispatch])



    return (
        <div className='update-inputBox'>
            <form onSubmit={onsubmit}>
                <h1>Update your Spot</h1>
                <p className="update-p-title">Country
                </p>
                <input
                    placeholder={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <p className="update-p-title">Street Address</p>

                <input
                    placeholder={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <p className="update-p-title">City</p>

                <input
                    placeholder={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <p className="update-p-title">State</p>

                <input
                    placeholder={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <p className="update-p-title">Describe your place to guests</p>
                <p>Mention the best features of your space, any special amenities like
                    fast wif or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    placeholder={description}
                    onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <p className="update-p-title">Create a title for your spot </p>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>

                <input
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="update-p-title">Set a base price for your spot</p>
                <input
                    placeholder={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type='submit'>Submit</button>
            </form>
        </div >
    )


}


export default UpdateSpot
