const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Booking, Spot } = require('../../db/models')


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


// not Done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Edit a Booking
router.put('/:bookingId',requireAuth, async (req, res) => {

    const { user } = req;
    console.log(user);

    const { bookingId } = req.params;
    console.log(bookingId)


    const booking = await Booking.findAll( );
    console.log(booking)





    res.status(200);
    res.json({ message: "hello" })

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




// const id = req.params.bookingId;
// // console.log('id', id);

// let { startDate, endDate } = req.body;
// console.log(req.body)

// const start = new Date(startDate) ;
// const end = new Date(endDate) ;
// console.log('start', start);
// console.log('end', end)

// if (start > end) {
//     res.status(403);
//     return res.json({
//         message: 'Past bookings can\'t be modified'
//     })
// }

// let book = await Booking.findAll({
//     where:{
//         id:id
//     }
// })
// console.log(book);

// if (!book) {
//     res.status(404);
//     res.json({
//         message: 'Booking couldn\'t be found'
//     })
// }

// book.startDate = String(start);
// book.endDate = String(end) ;
// console.log('book.startDate',book.startDate)
// console.log('book.endDate',book.endDate)


// // await book.save();

// res.status(200);
// res.json(book)


module.exports = router
