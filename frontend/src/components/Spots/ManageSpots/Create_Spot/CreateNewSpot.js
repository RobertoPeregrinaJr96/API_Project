import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { createSpot } from "../../../../store/spotReducer";
import { useHistory } from "react-router-dom";

const CreateNewSpot = () => {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

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
    const history = useHistory()

    const newSpot = {
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
        console.log('new spot ===>', newSpot)
        const spot = await dispatch(createSpot(newSpot))
        console.log("BRAND NEW ====>", spot)
        history.push('/spots/current')
    }



    return (
        <div className='update-inputBox'>
            <form onSubmit={onsubmit}>
                <h1>Create a new Spot</h1>
                <p className="update-p-title">Country
                </p>
                <input
                    placeholder="USA"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <p className="update-p-title">Street Address</p>

                <input
                    placeholder="111 Some Street"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <p className="update-p-title">City</p>

                <input
                    placeholder="New York City"
                    onChange={(e) => setCity(e.target.value)}
                />
                <p className="update-p-title">State</p>

                <input
                    placeholder="NY"
                    onChange={(e) => setState(e.target.value)}
                />
                <p className="update-p-title">Describe your place to guests</p>
                <p>Mention the best features of your space, any special amenities like
                    fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    placeholder="Describe your spot"
                    onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <p className="update-p-title">Create a title for your spot </p>
                <p>Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>

                <input
                    placeholder="Great Spot for the family Vacation"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="update-p-title">Set a base price for your spot</p>
                <input
                    placeholder="200"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button type='submit' >Submit</button>
            </form>
        </div >
    )
}


export default CreateNewSpot
