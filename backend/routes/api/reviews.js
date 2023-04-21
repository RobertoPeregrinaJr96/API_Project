const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, ReviewImage, Spot, SpotImage } = require('../../db/models');


const router = express.Router();

const validateReview = [
    check('review')
        .exists()
        .isString()
        .withMessage('Review text is required'),
    check('stars')
        .exists()
        .isInt()
        .isLength({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

const validateReviewImage = [
    check('url')
        .exists()
        .isURL()
        .withMessage('Please use a valid URL'),
    handleValidationErrors
]

// GET all reviews of current User // No Error handling needed
router.get('/current', async (req, res) => {

    // grab the user that we will be using
    const { user } = req
    // console.log(user)

    // check if the user is not null and if it is then respond with a error
    if (!user) {
        res.json({
            message: 'Please Login'
        })
    }

    // grab the user id
    const { id } = user
    // console.log(id)

    // we will find all the Reviews that that the userId equal to the user.id
    const reviews = await Review.findAll({
        where: {
            userId: id
        }
    })

    const arr = []

    reviews.forEach(review => arr.push(review.toJSON()))
    //reviews has a array of objects that we can key into
    // console.log('reviews', reviews[0].dataValues)
    // reviews {
    //     id: 10,
    //     review: 'this is a review',
    //     stars: 4,
    //     userId: 8,
    //     spotId: 5,
    //     createdAt: 2023-04-20T13:25:38.177Z,
    //     updatedAt: 2023-04-20T13:25:38.177Z
    //   }




    // we want to grab the users Info and only want the id , firstName and lastName
    const userInfo = await User.findByPk(id, {
        attributes: ['id', 'firstName', 'lastName']
    })
    // console.log('userInfo', userInfo.dataValues)
    //userInfo {
    //  id: 8,
    //   firstName: 'demoFirstName8',
    //    lastName: 'demoLastName8'
    // }

    // we need to grab the spots for each review that the user wrote


    const spotInfo = await Spot.findAll({
        // include: { model: SpotImage },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
            id: id //this needs to be review.spotId somehow
        }
    })
    // console.log(spotInfo)

    // const spotArr = []
    // spotInfo.forEach(spot => spotArr.push(spot.toJSON()))
    // console.log(spotArr)

    // spotInfo.forEach(spot => {
    //     spot.SpotImages.forEach(image => {
    //         console.log(image)
    //         if (image.preview === true || image.preview === 1) {
    //             spot.previewImage = image.url
    //             // console.log(spot.previewImage)
    //         }
    //         if (!spot.previewImage) {
    //             spot.previewImage = 'no previewImage found'
    //         }
    //         delete spot.SpotImages
    //     })
    // });

    arr.forEach(review => {
        // assign review.user to the value of current user
        review.user = userInfo.dataValues
        // console.log('review.user',review.user)
        // console.log('review', review)
        spotInfo.forEach(spot => {
            // if the value for review.spot is undefined then assign it to spot
            if (!review.spot) {
                review.spot = spot
            }

        });
    })
    // console.log(arr)

    res.json({ Reviews: arr })
})

// Add an Image to a Review based on the Review's Id
router.post('/:reviewId/images', [requireAuth, validateReviewImage], async (req, res) => {

    const id = req.params.reviewId
    // console.log(id)

    if (!id) {
        res.status(404)
        res.json({
            message: 'Review couldn\'t be found'
        })
    }

    const testReview = await Review.findByPk(id)

    if (!testReview) {
        res.status(404);
        res.json({
            message: "Review couldn\'t be found"
        })
    }

    const { url } = req.body
    // console.log('url', url)

    const review = await Review.findByPk(id, {
        include: [
            { model: ReviewImage }
        ]
    })

    // console.log(review)
    const { user } = req

    if (review.id !== user.id) {
        res.status(403);
        res.json({ message: 'You don\'t have permission to add an image' })
    }

    const imgCount = await ReviewImage.findAndCountAll({
        where: { reviewId: review.id }
    })
    console.log(imgCount)

    // let count;

    // const arr = review.ReviewImages
    // console.log(arr.length)

    // if (arr.length) {
    //     count = arr.length
    // }

    if (imgCount.count >= 9) {
        res.status(403)
        res.json({
            message: 'Maximum number of images for this resource was reached'
        })
    }

    const reviewImg = ReviewImage.build({
        url,
        reviewId: id
    })

    // console.log(reviewImg)

    await reviewImg.save()

    const safeImage = {
        reviewId: reviewImg.id,
        url: reviewImg.url
    }

    res.status(200);
    res.json(safeImage)

})

//edit a review
router.put('/:reviewId',[requireAuth, validateReview], async (req, res) => {

    const id = req.params.reviewId;
    console.log(id);

    const { user } = req
    // console.log(user)
    console.log('break1')

    const { review, stars } = req.body;
    // console.log(review);
    // console.log(stars);

    const reviews = await Review.findByPk(id);
    // console.log(reviews);

    if (!reviews) {
        res.status(404);
        res.json({
            message: 'Review couldn\'t be found'
        })
    }

    const userId = user.dataValues.id
    console.log("userId", userId)
    console.log('reviews.dataValues.id',reviews.dataValues.id)
    console.log('break2')

    if (userId !== reviews.dataValues.id) {
        res.status(403);
        res.json({ message: 'You do not have permission to delete this review' })
    }

    reviews.review = review;
    reviews.stars = stars;

    await reviews.save();

    res.status(200);
    res.json(reviews)

})

// Delete an existing review
router.delete('/:reviewId', [requireAuth], async (req, res) => {

    const id = req.params.reviewId;
    console.log('id', id);

    const { user } = req
    console.log(user.dataValues.id)
    console.log('user.id', user.id)
    console.log('break1')

    const review = await Review.findByPk(id)
    // console.log('review.userId', review.userId)

    if (!review) {
        res.status(404);
        res.json({ message: "Review couldn't be found" })
    }
    console.log('break2')
    // console.log('review.Review.id',review.Review.id)

    const userId = user.dataValues.id
    console.log("userId", userId)
    console.log('break3')

    if (userId !== review.dataValues.id) {
        res.status(403);
        res.json({ "message": "Forbidden" })
    }
    console.log('break4 ---------------------------------------')
    console.log(review)

    console.log('break 5 ------------------------------------')
    await review.destroy();
    const reviewTest = await Review.findByPk(id)
    console.log(reviewTest)

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })

})

module.exports = router
