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

    const img = await ReviewImage.findByPk(id)
    console.log(img)

    if (!img) {
        res.status(404);
        res.json({
            message: 'Review Image couldn\'t be found'
        })
    }

    await img.destroy()

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router;
