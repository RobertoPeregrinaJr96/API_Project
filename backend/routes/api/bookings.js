const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, ReviewImage, Spot, Booking, BookingImage } = require('../../db/models');


const router = express.Router();



router.get('/current', async (req, res) => {

    const { user } = req
    console.log(user)

    const id = user.id
    console.log(id)

    const userBookings = await Booking.findAll({
        // attributes:['startDate','endDate','userId','spotId'],
        where: [
            { userId: id }
        ],
        include: [{ model: Spot }],
    })
    console.log(userBookings)


    res.status(200)
    res.json(userBookings)
})









module.exports = router
