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

    if (!spots) {
        res.status(404)
        res.json({
            message: 'Cannot find any Spots'
        })
    }

    res.status(200)
    res.json(spots)

})

// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {

    const { user } = req
    // console.log(user)

    if (!user) {
        res.json({
            message: 'Please Login'
        })
    }

    const { id } = user
    // console.log(id)

    const userSpots = await Spot.findAll({
        where: {
            ownerId: id
        }
    })

    // console.log(userSpots)

    res.status(200)
    res.json(userSpots)
})

const validateSpotId = [
    create('id')
        .exists({ checkFalsy: true })
        .isNumber()
        .withMessage('Not a Valid Id')
]

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {

    const id = req.params.spotId;
    // console.log(id);

    if (!id) {
        res.status(404);
        res.json({
            message: 'Not a Valid Id'
        })
    }

    const spot = await Spot.findByPk(id, {
        include: {
            model: SpotImage
        }
    })

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    // console.log(spot)
    res.json(spot)
})

const validateCreateSpot = [
    check(address)
        .exists({ checkFalsy: true })
        .isString()
        .isU
        .withMessage('Street address is required'),
    check(city)
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('City is required'),
    check(state)
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('State is required'),
    check(country)
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Country is required'),
    check(lat)
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check(lng)
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check(name)
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ min: 1, max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check(description)
        .exists({ checkFalsy: true })
        .isString()
        .isLength(min: 1)
        .withMessage('Description is required'),
    check(price)
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
]

// Create a Spot
router.post('/', validateCreateSpot, async (req, res) => {

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

const validateGetImageFromBody = [
    create('url')
        .exists({ checkFalsy: true })
        .isUrl
        .withMessage('Not a valid Url'),
    create('preview')
        .exists({ checkFalsy: true })
        .withMessage('Please enter ether true or false'),
]

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', validateGetImageFromBody, async (req, res) => {
    // grab the id from the endpoint
    const id = req.params.spotId;
    // console.log(id)

    if (!id) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

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
router.put('/:spotId', validateSpotId, validateCreateSpot, async (req, res) => {

    const id = req.params.spotId;

    let { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body


    let spot = await Spot.findByPk(id)
    console.log(spot)

    // const log = [console.log('address', address),
    // console.log('city', city),
    // console.log('state', state),
    // console.log('country', country),
    // console.log('lat', lat),
    // console.log('lng', lng),
    // console.log('name', name),
    // console.log('description', description),
    // console.log('price', price),
    // console.log('ownerId', ownerId),
    // ]

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
router.delete('/:spotId',validateSpotId ,async (req, res) => {

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
