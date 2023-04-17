const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage } = require('../../db/models');


const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll()
    // console.log(spots)

    res.status(200)
    res.json(spots)

})

// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {

    const { user } = req
    // console.log(user)

    const { id } = user
    // console.log(id)

    const userSpots = await Spot.findAll({
        where: {
            ownerId: id
        }
    })

    // console.log(userSpots)

    res.json(userSpots)
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {

    const id = req.params.spotId;
    // console.log(id);

    const spot = await Spot.findByPk(id, {
        include: {
            model: SpotImage
        }
    })
    // console.log(spot)
    res.json(spot)
})


// Create a Spot
router.post('/', async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId
    })

    console.log(newSpot)

    await newSpot.save();

    res.status(201)
    res.json(newSpot)
})



// router.post('/:spotId/images', async (req, res) => {
//     const id = req.params.spotId
//     const spot = await Spot.findByPk(id,{
//         include:{
//             model:SpotImage
//         }
//     })

//     res.json(spot)
// })

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res) => {
    // grab the id from the endpoint
    const id = req.params.spotId;
    // console.log(id)

    // we will grab the url and preview from the request body by deconstructing the object
    const { url, preview } = req.body
    // console.log(url)
    // console.log(preview)

    // we create a new image object with the variables from request body and ave the associated id variable to the spotId
    const newImage = await SpotImage.build({
        url: url,
        preview: preview,
        spotId: id
    })

    // we save the new img
    await newImage.save()

    // console.log(newImage)

    res.json(newImage)
})


// Edit a Spot
router.put('/:spotId', async (req, res) => {

    const id = req.params.spotId;

    let { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body


    let spot = await Spot.findByPk(id)
    console.log(spot)

    // console.log('address', address);
    // console.log('city', city);
    // console.log('state', state);
    // console.log('country', country);
    // console.log('lat', lat);
    // console.log('lng', lng);
    // console.log('name', name);
    // console.log('description', description);
    // console.log('price', price);
    // console.log('ownerId', ownerId);

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;
    spot.ownerId = ownerId;

    await spot.save();
    // console.log(spot)

    res.json(spot)
})


// Delete a Spot
router.delete('/:spotId', async (req, res) => {

    const id = req.params.spotId;
    // console.log(id)

    const spot = await Spot.findByPk(id)
    // console.log(spot);

    await spot.destroy();

    res.json({
        message: 'Successfully deleted'
    })

})

















module.exports = router
