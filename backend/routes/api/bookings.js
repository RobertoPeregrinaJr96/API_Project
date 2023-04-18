const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

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


const validateStartDate = [
    check('startDate')
        .exists()
        .isAfter('startDate')
        .withMessage('skdfk')
]


// not Done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Edit a Booking
router.put('/:bookingId', async (req, res) => {

    const id = req.params.bookingId;
    console.log('id', id);

    let { startDate, endDate } = req.body;
    // console.log('startDate',typeof startDate);
    // console.log('endDate',typeof endDate);

    // startDate.split('-').join('');
    // endDate.split('-').join('');

    // console.log('startDate', startDate);
    // console.log('endDate', endDate);

    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    console.log('start', start);
    console.log('end', end)

    const start1 = new Date(startDate);
    const end1 = new Date(endDate);
    console.log('start1', start1);
    console.log('end1', end1)


    // if (start1 < end1) {
    //     res.status(400);
    //     return res.json({
    //         message: 'endDate cannot come before startDate'
    //     })
    // }
    if (start1 > end1) {
        res.status(403);
        return res.json({
            message: 'Past bookings can\'t be modified'
        })
    }

    const booking = await Booking.findByPk(id);
    console.log(booking);

    if (!booking) {
        res.status(404);
        res.json({
            message: 'Booking couldn\'t be found'
        })
    }

    booking.startDate = startDate;
    booking.endDate = endDate;

    // await booking.save();

    res.status(200);
    res.json(booking)

})

router.delete('/:bookingId', async (req, res) => {

    const id = req.params.bookingId;
    console.log(id);

    const booking = Booking.findByPk(id);
    console.log(booking);

    if (!booking) {
        res.status(404);
        res.json('Booking couldn\'t be found');
    }

    const start = parseInt(booking.startDate)
    console.log('start', start)
    const date = new Date();
    console.log('date', date)

    if (start > date) {
        res.status(403);
        res.json({
            message: 'Bookings that have been started can\'t be deleted'
        })
    }


    await booking.destroy;

    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })
})





module.exports = router
