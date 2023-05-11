import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { createSpot } from "../../../../store/spotReducer";
import { useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";

const CreateNewSpot = () => {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [lat] = useState(-75.67382)
    const [lng] = useState(-132.31456)
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({})
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()





    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();
    const history = useHistory()

    // console.log('images ===>', images)

    const newSpot = {
        'address': address,
        'city': city,
        'state': state,
        'country': country,
        'description': description,
        'name': name,
        'price': price,
        'ownerId': user.id,
        'lat': lat,
        'lng': lng,
        'previewImage': images
    }
    let imgArr = [];

    console.log('new spot ===>', newSpot)
    console.log(imgArr)

    const onsubmit = async (e) => {
        e.preventDefault()

        imgArr.push({ url: images, preview: true })


        const err = {}
        if (!country.length) err.country = 'Country is required'
        if (img1) imgArr.push({ url: img1, preview: true })
        if (!address.length) err.address = 'Address is required'
        if (img2) imgArr.push({ url: img2, preview: true })
        if (!city.length) err.city = 'City is required'
        if (img3) imgArr.push({ url: img3, preview: true })
        if (!state.length) err.state = 'State is required'
        if (img4) imgArr.push({ url: img4, preview: true })
        if (description.length < 30) err.description = 'Description needs a minimum of 30 characters'
        if (!name.length) err.name = 'Name is required'
        if (!price || price < 0) err.price = 'Price is required'
        if (!images.length) err.images = 'Preview image is required.'
        // if (images[1] && !images[1].endsWith('.png') && !images[1].endsWith('.jpg') && !images[1].endsWith('.jpeg')) {
        //     errors.images = "Image URL 1 must end in .png, .jpg, or .jpeg"
        // }
        setErrors(err)
        // console.log(err)
        if (Object.values(err).length === 0) {
            // console.log("BRAND NEW ====>", spot)
            const spot = await dispatch(createSpot(newSpot, imgArr))
            history.push(`/spots/${spot.id}`)
        }
        return null;

    }

    return (
        <div className='create-inputBox'>
            <form onSubmit={onsubmit}>
                <h1>Create a new Spot</h1>
                <div className="create-div-1">
                    <p className="update-p-Country">Country
                    </p>
                    <p className="errors">{errors.country}</p>
                    <input
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <p className="create-p-Street">Street Address</p>
                    <p className="errors">{errors.address}</p>
                    <input
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="create-div-2">
                    <p className="create-p-City">City</p>
                    <p className="errors">{errors.city}</p>

                    <input
                        className="div-2-input"
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <p className="create-p-State">STATE</p>
                    <p className="errors">{errors.state}</p>

                    <input
                        className="div-2-input"
                        placeholder="State"
                        onChange={(e) => setState(e.target.value)}
                    />
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
                <p className="create-p-Describe">Describe your place to guests</p>
                <p className="errors">{errors.description}</p>

                <p>Mention the best features of your space, any special amenities like
                    fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <p className="create-p-name">Create a title for your spot </p>
                <p className="errors">{errors.name}</p>

                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>
                <input
                    placeholder="Name of your Spot"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="create-p-price">Set a base price for your spot</p>
                <p className="errors">{errors.price}</p>

                $<input
                    placeholder="Price per night(USD)"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <div className='create-div-images'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <p className="errors">{errors.images}</p>
                    <input
                        placeholder="Preview Image URL"
                        onChange={(e) => setImages(e.target.value)}
                    ></input>
                    {/* {console.log('img===>', images)} */}
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg1(e.target.value)}
                    >
                    </input >
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg2(e.target.value)}
                    >
                    </input>
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg3(e.target.value)}
                    >
                    </input>
                    <br></br>
                    <input placeholder="Image Url"
                        onChange={(e) => setImg4(e.target.value)}
                    >
                    </input>
                </div>
                <button type='submit' >Submit</button>
            </form>
        </div >
    )
}



export default CreateNewSpot
// https://cdn.discordapp.com/attachments/1088906268485357618/1105996729062543412/images.png
