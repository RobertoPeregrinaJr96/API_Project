const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Review, ReviewImage, Booking, BookingImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req
    console.log(user)

    const id = req.params.imageId;
    console.log(id)

    const imgTest = await ReviewImage.findByPk(id)
    console.log('imgTest',imgTest)

    if (!imgTest) {
        res.status(404);
        res.json({
            message: 'Review Image couldn\'t be found'
        })
    }

    console.log('break 1 ------------------------------')

    const review = await Review.findByPk(imgTest.reviewId)
    console.log('review',review)
    console.log('user.id',user.id)
    console.log('review.userId',review.dataValues.userId)

    console.log('break 1 ------------------------------')
    if (user.id !== review.dataValues.userId) {
        res.status(403);
        res.json({
            message: "Forbidden"
        })
    }


    console.log('break 1 ------------------------------')

    await imgTest.destroy()
    console.log('break 1 ------------------------------')

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
