const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Review, ReviewImage, Booking, BookingImage } = require('../../db/models');
const { Op } = require('sequelize');
const spot = require('../../db/models/spot');



const router = express.Router();

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
    check('lat')
        .not()
        .isString()
        .withMessage('Latitude is not valid'),
    check('lng')
        .not()
        .isString()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('name')
        .not()
        .isInt()
        .withMessage('Name must be less than 50 characters and no numbers'),
    check('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Price per day is required'),
    check('price')
        .not()
        .isString()
        .withMessage('Price per day is required and is a Valid number'),
    handleValidationErrors
]

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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]


// Get all Spots
router.get('/', [requireAuth], async (req, res) => {

    const spotTest = await Spot.findAll()
    // console.log(spots)

    if (!spotTest) {
        res.status(404)
        res.json({
            message: 'Cannot find any Spots'
        })
    }

    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage, }
        ]
    });

    let arr = []
    spots.forEach(spot => arr.push(spot.toJSON()))
    // console.log('arr',arr)

    let count = 0;
    arr.forEach(spot => {
        spot.Reviews.forEach(review => {
            count += review.stars
        })
    })

    let aveStarRating = (count / arr.length)
    arr.forEach(spot => {
        spot.aveRating = aveStarRating.toFixed(1)
        delete spot.Reviews
    })
    arr.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image)
            if (image.preview === true || image.preview === 1) {
                spot.previewImage = image.url
                // console.log(spot.previewImage)
            }
            if (!spot.previewImage) {
                spot.previewImage = 'no previewImage found'
            }
            delete spot.SpotImages
            // console.log(spot.previewImage)
        })
    })

    res.status(200)
    res.json(arr)

})

// Get all Spots owned by the Current User
router.get('/current', [requireAuth], async (req, res) => {

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
        include: [{ model: Review }, { model: SpotImage }],
        where: {
            ownerId: id
        }
    })

    let arr = []

    userSpots.forEach(spot => {
        if (id === spot.ownerId) {
            arr.push(spot.toJSON())
        }
    })
    // console.log('arr', arr)

    let count = 0;

    arr.forEach(spot => {
        const id = spot.id
        spot.Reviews.forEach(review => {
            console.log(review)
            if (id == review.spotId)
                count += review.stars
            console.log(count)
        })
    })
    // console.log(arr.length)
    // console.log(count)
    let aveStarRating = (count / arr.length)
    console.log('aveStarRating', aveStarRating)

    arr.forEach(spot => {
        spot.aveRating = aveStarRating.toFixed(1)
        delete spot.Reviews
    })

    arr.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image)
            if (image.preview === true || image.preview === 1) {
                spot.previewImage = image.url
                // console.log(spot.previewImage)
            }
            if (!spot.previewImage) {
                spot.previewImage = 'no previewImage found'
            }

            // console.log(spot.previewImage)
        })
        delete spot.SpotImages
    })
    // console.log(userSpots)

    res.status(200)
    res.json({ "Spots": arr })
})


// Get details of a Spot from an id  // Error handling is Done
router.get('/:spotId', [requireAuth], async (req, res) => {

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
    const spotOwner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })
    console.log(spotOwner)


    const { count, rows } = await Review.findAndCountAll({
        where: {
            spotId: id
        }
    })
    // console.log(count)
    // console.log(rows)

    let aveRating = 0;

    for (let i = 0; i < rows.length; i++) {
        // console.log(rows[i].stars)

        aveRating += rows[i].stars
        // console.log(aveRating)
    }

    let avgStarRating = (aveRating / count).toFixed(1)
    console.log(avgStarRating)

    const safeSpot = {
        "id": spot.id,
        "ownerId": spot.ownerId,
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
        "numReviews": count,
        "avgStarRating": avgStarRating,
        "SpotImages": spot.SpotImages,
        'Owner': spotOwner
    }

    // console.log(spot)
    res.json(safeSpot)
})


// Create a Spot
router.post('/', [requireAuth, validateCreateSpot], async (req, res) => {

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

    const safeSpot = {
        "id": newSpot.id,
        "ownerId": user.id,
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "lat": lat,
        "lng": lng,
        "name": name,
        "description": description,
        "price": price,
        "createdAt": newSpot.createdAt,
        "updatedAt": newSpot.updatedAt
    }

    res.status(201)
    res.json(safeSpot)
})


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', [requireAuth, validateGetImageFromBody], async (req, res) => {
    // grab the id from the endpoint
    const id = req.params.spotId;
    // console.log(id)

    const testSpot = await Spot.findByPk(id);

    if (!testSpot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    const { user } = req;
    console.log(user);

    if (user.id !== id) {
        res.status(403)
        res.json({
            "message": "You do not own this spot"
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

    const safeImage = {
        'id': newImage.id,
        'url': newImage.url,
        'preview': newImage.preview
    }

    res.status(200)
    res.json(safeImage)
})

// Edit a Spot   // Error handling is Done
router.put('/:spotId', [requireAuth, validateCreateSpot], async (req, res) => {

    const id = req.params.spotId;
    console.log(id)

    const { user } = req;
    console.log(user.id);

    let spot = await Spot.findByPk(id)
    console.log(spot)

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    if (user.id !== spot.ownerId) {
        res.status(403);
        res.json({
            message: 'You are not Authorized to make changes to this Spot'
        })
    }

    let { address, city, state, country, lat, lng, name, description, price } = req.body


    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();
    console.log(spot)

    const safeSpot = {
        "id": spot.id,
        "ownerId": spot.ownerId,
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
        "updatedAt": spot.updatedAt
    }

    res.json(safeSpot)
})

// Delete a Spot
router.delete('/:spotId', [requireAuth], async (req, res) => {

    const id = req.params.spotId;
    // console.log(id)

    const { user } = req
    console.log(user)

    const spot = await Spot.findByPk(id)
    console.log(spot);

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

    if (spot.ownerId !== user.id) {
        res.status(403)
        res.json({
            message: 'This user doesn\'t own this spot and therefore unable to remove it'
        })
    }

    await spot.destroy();

    res.json({
        message: 'Successfully deleted'
    })

})

// GET all Reviews by a Spot's ID //   Error handling is Done
router.get('/:spotId/reviews', async (req, res) => {

    const id = req.params.spotId;
    console.log(id)

    const spotTest = await Spot.findByPk(id)

    if (!spotTest) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found"
        })
    }

    console.log('break')

    const { user } = req

    if (!user) {
        res.status(404);
        res.json({
            message: 'Please login'
        });
    }

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Review }
        ],

    })
    const spotId = spot.id
    console.log(spotId)


    console.log('break')

    const reviewImg = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'email', 'username']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        where: { spotId: spotId }
    })


    res.status(200);
    res.json({ Reviews: [reviewImg] })
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res) => {

    const id = req.params.spotId;
    // console.log('id', id)

    const { user } = req
    // console.log('user',user)

    // if user is not logged in then send a error response
    if (!user) {
        res.status(500);
        res.json({
            message: 'Please login'
        });
    }

    const userId = user.id
    console.log("userId", userId)
    console.log('break')



    // test if the user already left a review for the spot
    const reviewTest = await Review.findAll({
        where: {
            spotId: id,
            userId: userId
        }
    })
    console.log('reviewTest', reviewTest)
    console.log('length', reviewTest.length)

    if (reviewTest.length) {
        res.status(403);
        res.json({
            message: 'You have already made a review for this spot'
        })
    }

    // we find the spot by the id in the endpoint
    const spot = await Spot.findByPk(id, {
        include: [
            { model: Review },
        ],
    })
    // console.log(spot)

    // if spot does not exist then send error response
    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found'
        })
    }

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

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', [requireAuth], async (req, res) => {

    const id = req.params.spotId;
    console.log(id)

    const { user } = req;
    // console.log(user)

    const testSpot = await Spot.findByPk(id, {
        include: [
            { model: Booking }
        ],
    })

    if (!testSpot) {
        res.status(404);
        res.json({
            message: 'Spot could\'t be found'
        })
    }

    // what the guest see's
    if (testSpot.ownerId !== user.id) {
        const guestBooking = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate'],
            where: {
                spotId: testSpot.id
            }
        })
        res.status(200)
        res.json(guestBooking)

    }
    // what the owner of the spot sees
    const confirmedBooking = await Booking.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
        where: {
            spotId: testSpot.id
        }
    })

    res.status(200);
    res.json({ Booking: confirmedBooking })
})



// same problem as the one above as im getting back an extra SpotId and UserId???
// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', async (req, res) => {

    const { startDate, endDate } = req.body


    const id = req.params.spotId;
    // console.log(id);

    const { user } = req;
    // console.log(user.id);

    const spot = await Spot.findByPk(id);
    // console.log(spot.ownerId);

    if (!spot) {
        res.status({
            message: 'Spot could\'t be found'
        })
    }

    const start = new Date(startDate)
    console.log(start)
    const end = new Date(endDate)
    // console.log(end)

    if (start > end) {
        res.status(400)
        res.json({
            message: 'endDate cannot be on or before startDate'
        })
    }

    const testObj = {}

    const testBook = await Booking.findAll({
        where: {
            spotId: id,
        }
    })

    console.log(testBook)

    testBook.forEach(booking => {

        // console.log(booking)
        console.log(booking.startDate)
        console.log('startDate', booking.startDate.getTime())
        console.log('endDate', booking.endDate.getTime())
        console.log('start', start.getTime())
        console.log('end', end.getTime())

        if (booking.startDate.getTime() <= start.getTime()
            && booking.endDate.getTime() >= start.getTime()) {
            testObj.startDate = 'Start date conflicts with an existing booking'
        }

        if (booking.endDate.getTime() <= end.getTime()
            && booking.startDate.getTime() <= end.getTime()) {
            testObj.endDate = 'End date conflicts with an existing booking'
        }
    })

    if (testObj.startDate || testObj.endDate) {
        res.status(403)
        res.json(testObj)
    }


    console.log("break ======================================================")

    if (user.id !== spot.ownerId) {

        const newBooking = await Booking.build({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: user.id,
            spotId: spot.id,
        })

        await newBooking.save();

        const safeBooking = {
            startDate: newBooking.startDate.toISOString().split('T0')[0],
            endDate: newBooking.endDate.toISOString().split('T0')[0],
            userId: user.id,
            spotId: id,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt
        }

        res.status(200);
        res.json(safeBooking)
    }
    res.json({ message: 'You own the spot' })
})


module.exports = router




// // const { user } = req;
// //     console.log("user", user);

// //     const id = req.params.bookingId
// //     console.log('id', id)

// //     const booking = await Booking.findAll({ where: { id: id } });
// //     console.log(booking)

// //     // error message for if booking not found
// //     if (!booking) {
// //         res.status(404);
// //         res.json({
// //             "message": "Spot couldn't be found"
// //         })
// //     }

// //     // if you are not the owner
// //     if (booking.userId !== user.id) {
// //         res.status(200);
// //         const noOwnerBooking = await Booking.findByPk(id, {
// //             attributes: ['spotId', 'startDate', 'endDate']
// //         })

// //         let { spotId, startDate, endDate } = noOwnerBooking

// //         const safeResponse = {
// //             spotId: spotId,
// //             startDate: new Date(startDate.toDateString()),
// //             endDate: new Date(endDate.toDateString())
// //         }

// //         res.json({ Booking: safeResponse })
// //     }


// //     res.status(200);
// //     res.json({ message: "hello" })


// const id = req.params.spotId;
// console.log(id)

// const { user } = req;
// // console.log(user)

// const testSpot = await Spot.findByPk(id, {
//     include: [
//         { model: Booking }
//     ],
// })

// if (!testSpot) {
//     res.status(404);
//     res.json({
//         message: 'Spot could\'t be found'
//     })
// }

// const bookingArr = []

// testSpot.dataValues.Bookings.forEach(booking => {
//     bookingArr.push(booking.dataValues)
// })

// console.log(bookingArr)


// // if you are not the owner
// if (user.id == testSpot.dataValues.ownerId) {
//     res.status(200);

//     const safeResponse = {}

//     // bookingArr.forEach(booking => {

//     //     const noOwnerBooking = await Booking.findByPk(booking.id, {
//     //         attributes: ['spotId', 'startDate', 'endDate']
//     //     })

//     //     let { spotId, startDate, endDate } = noOwnerBooking

//     //     safeResponse.spotId = spotId,
//     //         safeResponse.startDate = new Date(startDate.toDateString()),
//     //         safeResponse.endDate = new Date(endDate.toDateString())
//     // }
//     // )


//     res.json({ Booking: safeResponse })
// }

// res.status(200);
// res.json({
//     Bookings: [

//     ]
// })
