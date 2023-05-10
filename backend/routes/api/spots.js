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
        .withMessage('Name must be less than 50 characters  '),
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
router.get('/', async (req, res) => {

    // are there any spots?
    const allSpots = await Spot.findAll();
    if (!allSpots) return res.status(404).json({ "message": "Cannot find any Spots" });
    // let grab everything ing the query if there is anything there
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    // let change the data from the query to valid integers
    const newPage = Number(page);
    const newSize = Number(size);
    const newMinLat = Number(minLat);
    const newMaxLat = Number(maxLat);
    const newMinLng = Number(maxLng);
    const newMaxLng = Number(maxLng);
    const newMinPrice = Number(minPrice);
    const newMaxPrice = Number(maxPrice)
    // let now set the pagination to default if the page OR size in NAN
    const pagination = {};
    if (isNaN(page)) page = 1;
    if (isNaN(size)) size = 20;
    if (page && size) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    };
    // let check if any are invalid and if so then gather all the error at the end and send it in the response
    const error = {};
    if (isNaN(page) || !Number.isInteger(page) || page < 1 || page > 10) {
        error.page = "Page must be greater than or equal to 1 "
    };
    if (isNaN(size) || !Number.isInteger(size) || size < 1 || size > 20) {
        error.size = "Size must be an integer greater than or equal to 1"
    };
    if (maxLat && (maxLat - Math.floor(maxLat)) === 0 || maxLat && isNaN(maxLat)) {
        error.maxLat = 'Maximum latitude is invalid'
    };
    if (minLat && (minLat - Math.floor(minLat)) === 0 || minLat && isNaN(minLat)) {
        error.minLat = 'Minimum latitude is invalid'
    };
    if (minLng && (minLng - Math.floor(minLng)) === 0 || minLng && isNaN(minLng)) {
        error.minLng = 'Maximum longitude is invalid'
    };
    if (maxLng && (maxLng - Math.floor(maxLng)) === 0 || maxLng && isNaN(maxLng)) {
        error.maxLng = 'Minimum longitude is invalid'
    };
    if (minPrice && (minPrice - Math.floor(minPrice)) === 0 || minPrice && isNaN(minPrice) || minPrice >= 0) {
        error.minPrice = 'Minimum price must be greater than or equal to 0'
    };
    if (maxPrice && (maxPrice - Math.floor(maxPrice)) === 0 || maxPrice && isNaN(minPrice) || maxPrice >= 0) {
        error.maxPrice = 'Maximum price must be greater than or equal to 0'
    };
    if (Object.entries(error).length !== 0) {
        res.status(400).json({ "message": "Bad Request", errors: error })
    };
    // now let make the query do something by inputting them into a object where we can just throw in the sequelize query
    const where = {}
    if (newMaxLat) {
        where.lat = { [Op.lte]: newMaxLat }
    }
    if (newMinLat) {
        where.lat = { [Op.gte]: newMinLat }
    }
    if (newMaxLng) {
        where.lng = { [Op.lte]: newMaxLng }
    }
    if (newMinLng) {
        where.lng = { [Op.gte]: newMinLng }
    }
    if (newMinPrice) {
        where.price = { [Op.gte]: newMinPrice }
    }
    if (newMaxPrice) {
        where.price = { [Op.lte]: newMaxPrice }
    }

    // lets throw the pagination to the query to make sure the user has the page and size the wanted
    const spots = await Spot.findAll({
        include: [{ model: Review }, { model: SpotImage, }],
        where,
        ...pagination
    });
    // let make a new key:value pair that holds the avg
    let arr = [];
    spots.forEach(spot => arr.push(spot.toJSON()));
    arr.forEach(spot => {
        // while we have the spots available to us ,lets also add the avg star rating for each spot using the reviews that each spot has
        let totalStars = 0;
        let totalReviews = 0;
        spot.Reviews.forEach(review => {
            totalReviews += 1
            totalStars += Number(review.stars)
        });
        if (totalReviews == 0) totalReviews = null;
        if (totalStars == 0) totalStars = null;
        const aveStarRating = Number(totalStars / totalReviews)
        spot.avgRating = Number(aveStarRating.toFixed(1))
        delete spot.Reviews
        // let see if the review has images and if so lets check if one is allowed to be shown
        spot.SpotImages.forEach(image => {
            if (image.preview === true) spot.previewImage = image.url;
            if (!spot.previewImage) spot.previewImage = 'no previewImage found';
            delete spot.SpotImages;
        })
        // turn strings into integers
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)

    })
    res.status(200)
    res.json({ "Spots": arr, "page": page, "size": size })
    /*

      const spotTest = await Spot.findAll()
      // console.log(spots)

      if (!spotTest) {
          res.status(404)
          res.json({
              message: 'Cannot find any Spots'
          })
      }

      console.log('break ============================================')

      let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
      page = parseInt(page);
      console.log('page', page)

      size = parseInt(size);
      console.log('size', size)

      // console.log(minLat)
      // console.log(maxLat)
      // console.log(minLng)
      // console.log(maxLng)
      // console.log(minPrice)
      // console.log(maxPrice)

      console.log('break -------------------------------------')

      const pagination = {};

      if (isNaN(page)) page = 1;
      if (isNaN(size)) size = 20;

      if (page && size) {

          pagination.limit = size;
          console.log('limit', pagination.limit)

          pagination.offset = size * (page - 1);
          console.log('offset', pagination.offset)

      }

      const error = {}

      if (isNaN(page) || !Number.isInteger(page) || page < 1 || page > 10) {
          error.page = "Page must be greater than or equal to 1 "
      }
      else if (isNaN(size) || !Number.isInteger(size) || size < 1 || size > 20) {
          error.size = "Size must be an integer greater than or equal to 1"
      }
      if (maxLat && (maxLat - Math.floor(maxLat)) === 0 || maxLat && isNaN(maxLat)) {
          error.maxLat = 'Maximum latitude is invalid'
      }
      if (minLat && (minLat - Math.floor(minLat)) === 0 || minLat && isNaN(minLat)) {
          error.minLat = 'Minimum latitude is invalid'
      }
      if (minLng && (minLng - Math.floor(minLng)) === 0 || minLng && isNaN(minLng)) {
          error.minLng = 'Maximum longitude is invalid'
      }
      if (maxLng && (maxLng - Math.floor(maxLng)) === 0 || maxLng && isNaN(maxLng)) {
          error.maxLng = 'Minimum longitude is invalid'
      }
      if (minPrice && (minPrice - Math.floor(minPrice)) === 0 || minPrice && isNaN(minPrice) || minPrice >= 0) {
          error.minPrice = 'Minimum price must be greater than or equal to 0'
      }
      if (maxPrice && (maxPrice - Math.floor(maxPrice)) === 0 || maxPrice && isNaN(minPrice) || maxPrice >= 0) {
          error.maxPrice = 'Maximum price must be greater than or equal to 0'
      }

      console.log(error)

      console.log(Object.entries(error).length !== 0)

      if (Object.entries(error).length !== 0) {
          res.status(400).json({ "message": "Bad Request", errors: error })
      }


      const spots = await Spot.findAll({
          include: [
              { model: Review },
              { model: SpotImage, }
          ],
          ...pagination
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
          spot.aveRating = Number(aveStarRating.toFixed(1))
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
      res.json({ Spots: arr, page: page, size: size })
    */
})

// Get all Spots owned by the Current User
router.get('/current', [requireAuth], async (req, res) => {

    // lets grab all the data availble to use from the request
    const { user } = req;
    const idOfUser = user.id;
    const userSpots = await Spot.findAll({
        include: [{ model: Review }, { model: SpotImage, }],
        where: { ownerId: idOfUser }
    });
    //let see if there are any valid spots
    if (!userSpots) return res.status(403).json({ "message": "Forbidden" });
    // let get the preview image and assaign the average rating for the spot
    let arr = [];
    userSpots.forEach(spot => arr.push(spot.toJSON()));
    arr.forEach(spot => {
        // while we have the spots available to us ,lets also add the avg star rating for each spot using the reviews that each spot has
        let totalStars = 0;
        let totalReviews = 0;
        spot.Reviews.forEach(review => {
            totalReviews += 1
            totalStars += Number(review.stars)
        });
        if (totalReviews == 0) totalReviews = 0;
        if (totalStars == 0) totalStars = 0;
        const aveStarRating = Number(totalStars / totalReviews)
        spot.avgRating = Number(aveStarRating.toFixed(1))
        delete spot.Reviews
        // let see if the review has images and if so lets check if one is allowed to be shown
        spot.SpotImages.forEach(image => {
            if (image.preview === true) spot.previewImage = image.url;
            if (!spot.previewImage) spot.previewImage = 'no previewImage found';
            delete spot.SpotImages;
        })
        // turn strings into integers
        spot.lat = Number(spot.lat)
        spot.lng = Number(spot.lng)
        spot.price = Number(spot.price)
    })
    return res.status(200).json({ "Spots": arr })
    /*
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
        spot.aveRating = Number(aveStarRating.toFixed(1))
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
           // turn strings into integers
           spot.lat = Number(spot.lat)
           spot.lng = Number(spot.lng)
           spot.price = Number(spot.price)
    })
    // console.log(userSpots)

    res.status(200)
    res.json({ "Spots": arr })

    */
})

// Get details of a Spot from an id  // Error handling is Done
router.get('/:spotId', async (req, res) => {
    // lets grab the data from the request
    const { user } = req;
    let idOfUser;
    if (user) idOfUser = user.id;
    const idOfSpot = req.params.spotId;
    // let check if the idOfSpot is a valid spot in the database
    const spotTest = await Spot.findByPk(idOfSpot);
    if (!spotTest) return res.status(404).json({ "message": "Spot couldn't be found" })
    // lets
    const spot = await Spot.findByPk(idOfSpot, {
        include: {
            "model": SpotImage,
            "attributes": { exclude: ['createdAt', 'updatedAt', 'spotId'] },
        },
    })

    const spotOwner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })
    console.log(spotOwner)

    // let find the average star rating for this spot
    const allSpotReview = await Review.findAll({ where: { spotId: idOfSpot } })
    let totalReviews = 1;
    let totalStars = 1
    allSpotReview.forEach(review => {
        totalReviews += 1
        totalStars += Number(review.stars)
    });
    if (totalReviews == 0) totalReviews = 0;
    if (totalStars == 0) totalStars = 0;
    const avgStarRating = Number(totalStars / totalReviews)
    spot.avgRating = Number(avgStarRating.toFixed(1))
    delete spot.Reviews
    // lets send the response in a object we structured
    const safeSpot = {
        "id": spot.id,
        "ownerId": spot.ownerId,
        "address": spot.address,
        "city": spot.city,
        "state": spot.state,
        "country": spot.country,
        "lat": Number(spot.lat),
        "lng": Number(spot.lng),
        "name": spot.name,
        "description": spot.description,
        "price": spot.price,
        "createdAt": spot.createdAt,
        "updatedAt": spot.updatedAt,
        "numReviews": totalReviews - 1,
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
router.post('/:spotId/images', [requireAuth], async (req, res) => {
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

    if (user.id !== testSpot.ownerId) {
        res.status(403)
        res.json({
            "message": "Forbidden"
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
            message: 'Forbidden'
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
            message: 'Forbidden'
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

    console.log('break 1 -----------------------------------')

    const { user } = req

    // if (!user) {
    //     res.status(403);
    //     res.json({
    //         "message": "Forbidden"
    //     });
    // }

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Review }
        ],

    })
    const spotId = spot.id
    console.log(spotId)


    console.log('break 3 ---------------------------------')

    const reviewImg = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        where: { spotId: spotId }
    })


    res.status(200);
    res.json({ Reviews: reviewImg })
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res) => {

    // grabbing the user and its id
    const { user } = req;
    const idOfUser = user.id;

    //checking the spot to see if its valid
    const idOfSpot = req.params.spotId
    const spotTest = await Spot.findByPk(idOfSpot)
    // checking if we are getting a valid spot back
    if (!spotTest) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    // check if you are getting valid data from the request to use
    const { review, stars } = req.body;
    const bodyError = {};
    if (!review) bodyError.review = "Review text is required";
    if (!stars) bodyError.stars = "Stars must be an integer from 1 to 5";
    if (Object.entries(bodyError).length) return res.status(400).json({ "errors": { "review": bodyError.review, "stars": bodyError.stars } })
    //check if a review exist on the spot from the user
    const spotReviews = await Review.findAll({ where: { spotId: idOfSpot } })
    for (let i = 0; i < spotReviews.length; i++) {
        const review = spotReviews[i];
        if (review.userId === idOfUser) return res.status(500).json({ "message": "User already has a review for this spot" })
    }
    // let create the review for the spot
    const newReview = await Review.create({
        "userId": idOfUser,
        "spotId": idOfSpot,
        "review": review,
        "stars": stars
    })
    return res.status(201).json(newReview)
    /*

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
    */
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', [requireAuth], async (req, res) => {

    const idOfSpot = req.params.spotId;
    const { user } = req;
    const idOfUser = user.id;
    const testSpot = await Spot.findByPk(idOfSpot, {
        include: [{ model: Booking }],
    });
    // test the spot to see if its valid
    if (!testSpot) {
        return res.status(404).json({ "message": "Spot couldn't be found" })
    }
    // what the guest see's
    if (testSpot.ownerId !== idOfUser) {
        const guestBooking = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate'],
            where: { "spotId": idOfSpot }
        })
        // console.log(guestBooking)
        const bookingArr = []
        guestBooking.forEach(spot => bookingArr.push(spot.toJSON()))
        console.log(bookingArr)
        for (let i = 0; i < bookingArr.length; i++) {
            console.log(bookingArr[i])
            console.log(bookingArr[0].startDate)
            bookingArr[i].startDate = bookingArr[i].startDate.toISOString().split('T0')[0]
            console.log(bookingArr[0].startDate)

            console.log(bookingArr[0].endDate)
            bookingArr[i].endDate = bookingArr[i].endDate.toISOString().split('T0')[0]
            console.log(bookingArr[0].endDate)

            console.log('break ==============================')
        }
        res.status(200)
        res.json({ Bookings: bookingArr })
    }
    // what the owner of the spot sees
    const confirmedBooking = await Booking.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ],
        where: { spotId: testSpot.id }
    })
    const bookingArr = []
    confirmedBooking.forEach(spot => bookingArr.push(spot.toJSON()))
    for (let i = 0; i < bookingArr.length; i++) {
        bookingArr[i].startDate = bookingArr[i].startDate.toISOString().split('T0')[0]
        console.log(bookingArr[0].startDate)
        console.log('break ==============================')
        bookingArr[i].endDate = bookingArr[i].endDate.toISOString().split('T0')[0]
        console.log(bookingArr[0].endDate)
    }
    res.status(200);
    res.json({ Booking: bookingArr })
    /*

    */
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', [requireAuth], async (req, res) => {

    // lets get the data from the request
    const { user } = req;
    const idOfUser = user.id;
    const idOfSpot = req.params.spotId;
    const { startDate, endDate } = req.body;

    const testSpot = await Spot.findByPk(idOfSpot);
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    // let see if the endpoint is a valid spot
    if (!testSpot) return res.status(404).json({ "message": "Spot couldn't be found" });
    //!!!!!!!!!!!!!!!Add validation for req.body
    const bodyError = {};
    if (!startDate) bodyError.startDate = "startDate value is invalid";
    if (!endDate) bodyError.endDate = "endDate value is invalid";
    if (Object.entries(bodyError).length !== 0) return res.status(400).json({ "errors": bodyError })
    // let see if the data from the body is valid
    if (start >= end) return res.status(400).json({
        "message": "Bad Request",
        "errors": {
            "endDate": "endDate cannot be on or before startDate"
        }
    })
    // let see if the user is NOT the owner of the Spot and has the ablilty to make a booking on the spot
    if (idOfUser === testSpot.ownerId) {
        return res.status(403).json({ "message": 'Forbidden' })
    }
    //let see if there is a date conflict where the start is within another booking date
    const bookingConflict = await Booking.findAll({
        where: {
            spotId: idOfSpot
        },
    })
    //let iterate the array we get back from findAll and make comparisons and make a object to keep track of if there is a conflict
    const conflictObject = {};
    bookingConflict.forEach(booking => {
        console.log("booking", booking)
        // if the start is lesser than or equal to startDate AND end is greater than or equal to endDate
        console.log(start)
        console.log(end)
        console.log(new Date(startDate).getTime())
        console.log(new Date(endDate).getTime())

        if (start <= new Date(booking.startDate).getTime() && end >= new Date(booking.endDate).getTime()) {
            conflictObject.conflict = true
        };
        // if end is greater than the startDate AND end id lesser than or equal to endDate // we care comparing them as those long integers
        if (end > new Date(booking.startDate).getTime() && end <= new Date(booking.endDate).getTime() || start >= new Date(booking.startDate).getTime() && start < new Date(booking.endDate).getTime()) {
            conflictObject.conflict = true
        };
        if (conflictObject.conflict === true) return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    })
    // let make a new booking
    const newBooking = await Booking.create({
        "spotId": Number(idOfSpot),
        "userId": Number(idOfUser),
        "startDate": startDate,
        "endDate": endDate
    })
    // let make a safe response to send back
    const safeBooking = {
        "id": Number(newBooking.id),
        "spotId": Number(idOfSpot),
        "userId": Number(idOfUser),
        "startDate": startDate,
        "endDate": endDate,
        "createdAt": newBooking.createdAt,
        "updatedAt": newBooking.updatedAt
    }
    return res.status(201).json(safeBooking)
    /*


        const { startDate, endDate } = req.body
        const id = req.params.spotId;
        // console.log(id);
        const { user } = req;
        // console.log(user.id);
        const spot = await Spot.findByPk(id,{
            exclude:['SpotId','UserId']
        });
        // console.log(spot.ownerId);
        if (!spot) {
            res.status({
                message: 'Spot could\'t be found'
            })
        }
        const start = new Date(startDate)
        // console.log(start)
        const end = new Date(endDate)
        // console.log(end)

        if (start > end) {
            return res.status(400).json({
                message: 'endDate cannot be on or before startDate'
            })
        }
        console.log('break ----------------------------------------------')
        // const testObj = {}
        const testBook = await Booking.findAll({
            where: {
                spotId: id,
            }
        })
        // console.log(testBook)
        testBook.forEach(booking => {
            console.log(booking)
            // console.log(booking.startDate)
            // console.log('startDate', booking.startDate.getTime())
            // console.log('endDate', booking.endDate.getTime())
            // console.log('start', start.getTime())
            // console.log('end', end.getTime())
            // console.log("booking.startDate.getTime() <= start.getTime()&& booking.endDate.getTime() >= start.getTime()",booking.startDate.getTime() <= start.getTime()
            // && booking.endDate.getTime() >= start.getTime())
            if (booking.startDate.getTime() <= start.getTime()
                && booking.endDate.getTime() >= start.getTime()) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                })
            }
            // console.log("booking.endDate.getTime() <= end.getTime()&& booking.startDate.getTime() < end.getTime()",booking.endDate.getTime() <= end.getTime()
            // && booking.startDate.getTime() < end.getTime())

            // if (booking.endDate.getTime() <= end.getTime()
            //     && booking.startDate.getTime() < end.getTime()) {
            //     testObj.endDate = 'End date conflicts with an existing booking'
            // }
            // console.log('boolean', testObj.startDate)
            // console.log('boolean', testObj.endDate)
        })

        // console.log('testObj.startDate && testObj.endDate', testObj.startDate && testObj.endDate)
        // if (testObj.startDate && testObj.endDate) {
        //     return res.status(403).json({
        //         "message": "Sorry, this spot is already booked for the specified dates",
        //         "errors": {
        //             "startDate": "Start date conflicts with an existing booking",
        //             "endDate": "End date conflicts with an existing booking"
        //         }
        //     })
        // }
        // // console.log("testObj.startDate || testObj.endDate", testObj.startDate || testObj.endDate)
        // if (testObj.startDate || testObj.endDate) {
        //     return res.status(403).json({
        //         "message": "Sorry, this spot is already booked for the specified dates",
        //         "errors": testObj
        //     })
        // }
        console.log("break ======================================================")
        if (user.id !== spot.ownerId) {
            const newBooking = await Booking.create({
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId: user.id,
                spotId: spot.id,
            })
            // await newBooking.save();
            const safeBooking = {
                id: newBooking.id,
                startDate: newBooking.startDate.toISOString().split('T0')[0],
                endDate: newBooking.endDate.toISOString().split('T0')[0],
                userId: user.id,
                spotId: id,
                createdAt: newBooking.createdAt,
                updatedAt: newBooking.updatedAt
            }

            return res.status(200).json(safeBooking)
        }
        if (user.id === spot.ownerId) {
            res.status(403).json({ message: 'Forbidden' })
        }

    */
})


module.exports = router
