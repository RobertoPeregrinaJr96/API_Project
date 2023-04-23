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

    const imgTest = await SpotImage.findByPk(id)
    console.log('imgTest', imgTest)

    if (!imgTest) {
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found"
        })
    }

    console.log('break 1 ------------------------------')

    const spot = await Spot.findByPk(imgTest.dataValues.spotId)
    console.log('spot', spot)
    console.log('user.id', user.id)
    console.log('spot.userId', spot.dataValues.ownerId)

    console.log('break 1 ------------------------------')
    if (user.id !== spot.dataValues.ownerId) {
        res.status(403);
        res.json({
            message: "Forbidden"
        })
    }


    console.log('break 1 ------------------------------')

    await imgTest.destroy()
    console.log(imgTest)

    console.log('break 1 ------------------------------')

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
