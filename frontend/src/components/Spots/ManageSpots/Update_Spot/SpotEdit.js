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
    const [lat] = useState(-75.67382)
    const [lng] = useState(-132.31456)
    const [images] = useState([])
    const [errors, setErrors] = useState({})

    // const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)
    // console.log(lat)
    // console.log(lng)
    // console.log(setImages())


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
        'lat': lat,
        'lng': lng
    }

    const spotId = Number(id)

    useEffect(() => {
        dispatch(fetchDetailedSpotThunk(spotId))
    }, [dispatch,spotId])

    const onsubmit = async (e) => {
        e.preventDefault()
        // console.log('new spot ===>', newSpot)

        const err = {}
        if (!country.length) err.country = 'Country is required'
        if (!address.length) err.address = 'Address is required'
        if (!city.length) err.city = 'City is required'
        if (!state.length) err.state = 'State is required'
        if (description.length < 30) err.description = 'Description needs a minimum of 30 characters'
        if (!name.length) err.name = 'Name is required'
        if (!price) err.price = 'Price is required'
        if (images.length) err.images = 'Preview image is required.'
        setErrors(err)

        if (Object.values(err).length === 0) {
            const spot = await dispatch(updateSpot(spotEdit))
            console.log("Updated Spot ====>", spot)
            history.push('/spots/current')
        }
        return;
    }

    return (
        <div className='update-inputBox'>
            <form onSubmit={onsubmit}>

                <h1>Update your Spot</h1>
                <div className="create-div-1">

                    <label>
                        <p className="update-p-title">Country
                        </p>

                        <input
                            placeholder={country}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <p className="errors">{errors.country}</p>

                    </label>
                    <p className="update-p-title">Street Address</p>
                    <p className="errors">{errors.address}</p>

                    <input
                        placeholder={address}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="create-div-2">
                    <p className="update-p-title">City</p>
                    <p className="errors">{errors.city}</p>

                    <input
                        placeholder={city}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <p className="update-p-title">State</p>
                    <p className="errors">{errors.state}</p>

                    <input
                        placeholder={state}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />

                </div>
                <br></br>
                {/* <div className="create-div-3">
                    <p className="create-p-Latitude">Latitude</p>
                    <p className="errors">{errors.latitude}</p>

                    <input
                        value={''}
                        className="div-2-input"
                        placeholder="100.100"
                        onChange={(e) => setLat(e.target.value)}
                    />
                    <p className="create-p-Longitude">Longitude</p>
                    <p className="errors">{errors.longitude}</p>

                    <input
                        value={''}
                        className="div-2-input"
                        placeholder="100.100"
                        onChange={(e) => setLng(e.target.value)}
                    />

                </div> */}
                <p className="update-p-title">Describe your place to guests</p>
                <p className="errors">{errors.description}</p>

                <p>Mention the best features of your space, any special amenities like
                    fast wif or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    value={description}
                    placeholder={description}
                    onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <p className="update-p-title">Create a title for your spot </p>
                <p className="errors">{errors.name}</p>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>

                <input
                    value={name}
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="update-p-title">Set a base price for your spot</p>
                <p className="errors">{errors.price}</p>

                <input
                    value={price}
                    placeholder={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {/* <div className='create-div-images'>
                    <h2>Liven up your spot with photos</h2>
                    <p className="errors">{errors.images}</p>

                    <p>Submit a link to at least one photo to publish your spot</p>
                    <input value={images[1]} onChange={(e) => setImages([...images, e.target.value])} ></input>
                    <br></br>
                    <input onChange={(e) => setImages([...images, e.target.value])}></input>
                    <br></br>
                    <input onChange={(e) => setImages([...images, e.target.value])}></input>
                    <br></br>
                    <input onChange={(e) => setImages([...images, e.target.value])}></input>
                    <br></br>
                    <input onChange={(e) => setImages([...images, e.target.value])}></input>
                </div> */}
                <button type='submit'>Submit</button>
            </form>
        </div >
    )


}


export default UpdateSpot
