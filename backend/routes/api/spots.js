const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Review, ReviewImage, Booking, BookingImage } = require('../../db/models');
const { Op } = require('sequelize');



const router = express.Router();

// Get all Spots
router.get('/', requireAuth, async (req, res) => {

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


// Get details of a Spot from an id
router.get('/:spotId', requireAuth, async (req, res) => {

    const id = req.params.spotId;
    // console.log(id);

    if (!id) {
        res.status(404);
        res.json({
            message: 'Not a Valid Id'
        })
    }

    const spot = await Spot.findByPk(id, {
        // attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
            model: SpotImage,
            attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] },
        },
    })

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    const reviewCount = await Review.findAndCountAll({
        where: {
            spotId: id
        }
    })
    // !!!!!!!!!!!!!! FIX THIS FIRST THIME IN GMORE
    const aveRating = await Review.count({
        where: {
            spotId:
        }
    })
    ///!!!!!!!!!!!!!!!!!!!
    console.log(aveRating)

    const safeSpot = {
        "id": spot.id,
        "address": spot.address,
        "city": spot.city,
        "state": spot.state,
        "country": spot.country,
        "lat": spot.lat,
        "lng": spot.lng,
        "name": spot.name,
        "description": spot.description,
        "price": spot.price,
        "createdAt": spot.createdAt,
        "updatedAt": spot.updatedAt,
        "numReviews": reviewCount.count,
        "avgStarRating": aveRating,
        "ownerId": spot.ownerId,
        "SpotImages": spot.SpotImages
    }

    // console.log(spot)
    res.json(safeSpot)
})

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal({ force_decimal: true, decimal_digits: '1,10', locale: 'en-US' })
        // .isLatLong({ checkDMS: false })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal({ force_decimal: true, decimal_digits: '1,10', locale: 'en-US' })
        // .isLatLong({ checkDMS: false })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

// Create a Spot
router.post('/', validateCreateSpot, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price, } = req.body

    // console.log(id)

    const { user } = req

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
        ownerId: user.id
    })

    console.log(newSpot)

    await newSpot.save();

    res.status(201)
    res.json(newSpot)
})

const validateGetImageFromBody = [
    check('url')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Not a valid Url'),
    check('preview')
        .exists({ checkFalsy: true })
        .isBoolean({ strict: true })
        .withMessage('Please enter ether true or false'),
    handleValidationErrors
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
router.put('/:spotId', [validateCreateSpot], async (req, res) => {

    const id = req.params.spotId;

    let spot = await Spot.findByPk(id)
    console.log(spot)

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    let { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body



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
    console.log(spot)

    res.json(spot)
})


// Delete a Spot
router.delete('/:spotId', async (req, res) => {

    const id = req.params.spotId;
    // console.log(id)

    const spot = await Spot.findByPk(id)
    // console.log(spot);

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    await spot.destroy();

    res.json({
        message: 'Successfully deleted'
    })

})

// GET all Reviews by a Spot's ID
router.get('/:spotId/reviews', async (req, res) => {

    const id = req.params.spotId;
    console.log(id)

    if (!id) {
        res.status(404);
        res.json({
            message: 'Please login'
        });
    }

    const spotReview = await Spot.findByPk(id, {
        include: [
            { model: Review },

        ],

    })
    console.log(spotReview)

    if (!spotReview) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    const reviewImg = await Review.findByPk(spotReview.id, {
        include: [
            { model: User },
            { model: ReviewImage },
        ]
    })


    res.status(200);
    res.json(reviewImg)
})

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .isNumeric()
        .isLength({ max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validateReview, async (req, res) => {

    const id = req.params.spotId;
    console.log(id)

    if (!id) {
        res.status(500);
        res.json({
            message: 'Please login'
        });
    }

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Review },

        ],

    })
    console.log(spot)

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }
    const { user } = req
    const { review, stars } = req.body

    const spotReview = await Review.create({
        review,
        stars,
        spotId: spot.id,
        userId: user.id
    })

    res.status(201);
    res.json(spotReview)

})

// NOT DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', async (req, res) => {

    const id = req.params.spotId;

    const { user } = req;
    // console.log(user)

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Booking }
        ]

    })

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot could\'t be found'
        })
    }

    // console.log('spot',spot);
    // console.log('id', id);
    // console.log('user.id', user.id);
    // console.log('spot.ownerId', spot.ownerId)

    if (user.id == spot.ownerId) {
        res.status(200);
        res.json({
            Bookings: [
                user,
                spot.Booking
            ]
        })
        // res.json({ "message": 'you own this' })
    }

    res.status(200);
    res.json({
        Bookings: [
            spot.Bookings
        ]
    })

})

//  const validateBooking = [
//     check('startDate')
//     .exists()
//     .withMessage('Start date conflicts with an existing booking')

//  ]


// same problem as the one above as im getting back an extra SpotId and UserId???
// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', async (req, res) => {

    const { startDate, endDate } = req.body

    const id = req.params.spotId;
    console.log(id);

    const { user } = req;
    console.log(user.id);

    const spot = await Spot.findByPk(id);
    console.log(spot.ownerId);

    if (!spot) {
        res.status({
            message: 'Spot could\'t be found'
        })
    }

    const newBooking = await Booking.build({
        startDate,
        endDate,
        userId: user.id,
        spotId: spot.id,
    })

    await newBooking.save();

    res.status(200);
    res.json(newBooking)

})


module.exports = router
