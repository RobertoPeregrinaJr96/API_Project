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
    }, [dispatch, spotId])

    const onsubmit = async (e) => {
        e.preventDefault()
        // console.log('new spot ===>', newSpot)

        const err = {}
        if (!country.length) err.country = 'Country is required'
        if (!address.length) err.address = 'Address is required'
        if (!city.length) err.city = 'City is required'
        if (!state.length) err.state = 'State is required'
        if (description.length < 30) err.description = 'Description needs a minimum of 30 characters or more characters'
        if (!name.length) err.name = 'Name is required'
        if (!price) err.price = 'Price per night is required'
        if (images.length) err.images = 'Preview image is required.'
        setErrors(err)

        if (Object.values(err).length === 0) {
            const spot = await dispatch(updateSpot(spotEdit))
            console.log("Updated Spot ====>", spot)
            history.push(`/spots/${spot.id}`)
        }
        return;
    }

    return (
        <div className='create-inputBox'>
            <form onSubmit={onsubmit} className="create-form">
                <h1 className="create-h1-header">Update your Spot</h1>
                <div>
                    <h2>Where's your place located?</h2>
                    <p className="form-info">Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <div className="create-div-1">
                    <div>
                        <div className="h2-p">
                            <p className="create-p"> Country
                            </p>
                            <p className="errors">&#160;{errors.country}</p>
                        </div>
                        <input
                            type="text"
                            className="left-1-input"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="h2-p">
                            <p className="create-p">Street Address</p>
                            <p className="errors">&#160;{errors.address}</p>
                        </div>
                        <input
                            value={address}
                            type="text"
                            className="right-1-input"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="create-div-2">
                    <div className="left-div">
                        <div className="h2-p">
                            <p className="create-p">City</p>
                            <p className="errors">&#160;{errors.city}</p>
                        </div>

                        <input
                            value={city}
                            type="text"
                            className="div-2-input"
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                        />

                    </div>
                    <div className="right-div">
                        <div className="h2-p">
                            <p className="create-p">STATE</p>
                            <p className="errors">&#160;{errors.state}</p>
                        </div>

                        <input
                            value={state}
                            type="text"
                            className="div-2-input"
                            placeholder="State"
                            onChange={(e) => setState(e.target.value)}
                        />

                    </div>
                </div>
                <br></br>
                {/* <div className="create-div-3">
                    <p className="create-p-Latitude">Latitude</p>
                    <p className="errors">{errors.latitude}</p>

                    <input
                        className="div-2-input"
                        placeholder="100.100"
                        onChange={(e) => setLat(e.target.value)}
                    />
                    <p className="create-p-Longitude">Longitude</p>
                    <p className="errors">{errors.longitude}</p>
                    <input
                        className="div-2-input"
                        placeholder="100.100"
                        onChange={(e) => setLng(e.target.value)}
                    />

                </div> */}
                <p className="create-h1-header">Describe your place to guests</p>
                <div className="opps">

                    <h2>Mention the best features of your space, any special amenities like
                    </h2>
                    <p> fast wifi or parking, and what you love about the neighborhood.
                    </p>
                </div>
                <p className="line"></p>
                <textarea
                    value={description}
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <p className="errors">&#160;{errors.description}</p>
                <p className="line"></p>
                <div>
                    <h2 className="create-h1-header">Create a title for your spot </h2>

                </div>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>

                <input
                    value={name}
                    type="text"
                    placeholder="Name of your Spot"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="errors">&#160;{errors.name}</p>
                <h2 className="create-h1-header">Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    value={price}
                    type="number"
                    className="price-input"
                    placeholder="$$$ Price per night(USD)"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <p className="errors">&#160;{errors.price}</p>
                <p className="line"></p>

                {/* <div className='create-div-images'>
                    <h2 className="create-h1-header">Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <input
                        placeholder="Preview Image URL"
                        onChange={(e) => setImages(e.target.value)}
                    ></input>
                    <p className="errors">&#160;{errors.images}</p>
                    <p className="errors">&#160;{errors.images2}</p>
                    {/* {console.log('img===>', images)}
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg1(e.target.value)}
                    >
                    </input >
                    <p className="errors">&#160;{errors.img1}</p>
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg2(e.target.value)}
                    >
                    </input>
                    <p className="errors">{errors.img2}</p>
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg3(e.target.value)}
                    >
                    </input>
                    <p className="errors">&#160;{errors.img3}</p>
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg4(e.target.value)}
                    >
                    </input>
                    <p className="errors">&#160;{errors.img4}</p>
                </div> */}
                <p className="line"></p>

                <div className="button-div">
                    <button type='submit' className="sub-button">Update Spot</button>

                </div>
            </form>
        </div >
    )


}


export default UpdateSpot
