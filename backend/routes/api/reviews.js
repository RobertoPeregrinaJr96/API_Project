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
router.get('/current', requireAuth, async (req, res) => {

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

    console.log('break 1 ===========================')

    // for loop over reviewsList
    // let spot = reviewsList[i].Spot
    // for loop over spot.SpotImages (requires that you have include the SpotImage model in your query)
    // 	let spotImage = spot.SpotImages[j]
    // 	if spotImage.preview === true
    // spot.previewImage = spotImage.url

    // we will find all the Reviews that that the userId equal to the user.id

    const reviewList = await Review.findAll({
        include: [
            {
                model: User, attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot, include: { model: SpotImage },

            }, {
                model: ReviewImage
            }
        ],
        where: {
            userId: id
        }
    })
    // console.log('reviewList', reviewList)

    let arr = []
    reviewList.forEach(spot => arr.push(spot.toJSON()))

    for (let i = 0; i < arr.length; i++) {

        const spot = arr[i].Spot;
        // console.log('spot', spot)

        for (let j = 0; j < spot.SpotImages.length; j++) {

            const img = spot.SpotImages[j];
            console.log('img', img)

            if (img.preview === true) {
                spot.previewImage = img.url
                console.log('previewImage', spot.previewImage)
            }
            console.log('break-------------------------------------')
            if (!spot.previewImage) {
                spot.previewImage = 'no previewImage found'
                console.log('previewImage', spot.previewImage)
            }
        }

        delete spot.SpotImages // it works??? but not saving in the outer obj
        console.log('data', spot.SpotImages)
    }

    console.log('break 2 ===========================')

    console.log('reviewList', arr)

    res.json({ Reviews: arr })
})

// Add an Image to a Review based on the Review's Id
router.post('/:reviewId/images', [requireAuth, validateReviewImage], async (req, res) => {

    const id = req.params.reviewId
    console.log(id)

    const testReview = await Review.findByPk(id)

    if (!testReview) {
        res.status(404)
        res.json({
            message: 'Review couldn\'t be found'
        })
    }

    console.log('break 1 ---------------------------')

    const { url } = req.body
    // console.log('url', url)

    const review = await Review.findByPk(id, {
        include: [
            { model: ReviewImage }
        ]
    })

    console.log(review)
    const { user } = req

    if (review.userId !== user.id) {
        res.status(403);
        res.json({ message: 'You don\'t have permission to add an image' })
    }

    console.log('break 2 ------------------------------------')

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

    console.log(imgCount.count)

    if (imgCount.count > 9 ){
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
    res.json({ Reviews: reviewImg })

})

//edit a review
router.put('/:reviewId', [requireAuth, validateReview], async (req, res) => {

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
    console.log('reviews.dataValues.id', reviews.dataValues.id)
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
