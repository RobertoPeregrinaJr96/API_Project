const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, ReviewImage, Spot } = require('../../db/models');


const router = express.Router();

const validateReview = [
    check('review')
        .exists()
        .isString()
        .withMessage('Review text is required'),
    check('review')
        .not()
        .isInt()
        .withMessage('Review text is required'),
    check('stars')
        .exists()
        .isInt({gt: 1, lt: 5})
        .isLength( )
        .withMessage('Stars must be an integer from 1 to 5'),
    check('stars')
        .not()
        .isString()
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

    const { user } = req
    console.log(user)

    if (!user) {
        res.json({
            message: 'Please Login'
        })
    }

    const { id } = user
    console.log(id)

    const userReview = await Review.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot },
            { model: ReviewImage },
        ],
        where: {
            userId: id
        },

    })
    1
    // const {userId,firstName,lastName} = userReview.User

    const safeUser = {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName
    }
    // console.log(safeUser)

    console.log(userReview)

    const safeReview = {
        "Reviews": userReview
        // {
        //     "id": userReview.id,
        //     "userId": userReview.userId,
        //     "spotId": userReview.spotId,
        //     "review": userReview.review,
        //     "stars": userReview.stars,
        //     "createdAt": userReview.createdAt,
        //     "updatedAt": userReview.updatedAt,
        //     "User": safeUser,
        //     "Spot": userReview.Spot,
        //     "ReviewImages": userReview.ReviewImage
        // }
    }

    res.status(200)
    res.json(safeReview)
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

    const { url } = req.body
    // console.log('url', url)

    const review = await Review.findByPk(id, {
        include: [
            { model: ReviewImage }
        ]
    })

    // console.log(review)

    let count;

    const arr = review.ReviewImages
    console.log(arr.length)

    if (arr.length) {
        count = arr.length
    }

    if (count >= 9) {
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

    res.status(200);
    res.json(reviewImg)

})

router.put('/:reviewId',[ validateReview], async (req, res) => {

    const id = req.params.reviewId;
    console.log(id);


    const { review, stars } = req.body;
    console.log(review);
    console.log(stars);

    // if (!review || typeof review !== String) {
    //     res.status(404);
    //     res.json({
    //         message: 'Review text is required'
    //     })
    // }
    // if (!stars || typeof stars !== Number) {
    //     res.stats(404);
    //     res.json({
    //         message: 'Stars must be an integer from 1 to 5'
    //     })
    // }

    const reviews = await Review.findByPk(id);
    console.log(reviews);

    if (!reviews) {
        res.status(404);
        res.json({
            message: 'Review couldn\'t be found'
        })
    }

    reviews.review = review;
    reviews.stars = stars;

    await reviews.save();

    res.status(200);
    res.json(reviews)

})

// Delete an existing review
router.delete('/:reviewId', async (req, res) => {

    const id = req.params.reviewId;
    console.log(id);

    const review = await Review.findByPk(id, {
        include: [
            { model: ReviewImage }
        ]
    })
    console.log(review)

    await review.destroy();

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })

})

module.exports = router
