const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Booking, Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');



const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req
    // console.log('user', user)

    console.log('break 1 ----------')

    const Bookings = await Booking.findAll({
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        include: [
            {
                model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price'],
                include: { model: SpotImage, attributes: ['url', 'preview'] }
            }
        ],
        where: {
            userId: user.id
        },
    })

    // Bookings.dataValues.startDate = start.toISOString().split('T0')[0];
    // Bookings.dataValues.endDate = end.toISOString().split('T0')[0];


    const bookingArr = []

    Bookings.forEach(booking => bookingArr.push(booking.toJSON()))

    bookingArr[0].startDate = bookingArr[0].startDate.toISOString().split('T0')[0]
    console.log(bookingArr[0].startDate)

    bookingArr[0].endDate = bookingArr[0].endDate.toISOString().split('T0')[0]
    console.log(bookingArr[0].endDate)

    for (let i = 0; i < bookingArr.length; i++) {

        const spot = bookingArr[i].Spot;
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
    // console.log(currentBooking)
    console.log('break 3 ----------')

    res.status(200)
    res.json({ Bookings: bookingArr })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {

    // let get all of the data from the request
    const { user } = req;
    const idOfUser = user.id;
    const idOfBooking = req.params.bookingId;
    const testBooking = await Booking.findByPk(idOfBooking);
    const { startDate, endDate } = req.body;
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    // let see if the endpoint is valid
    if (!testBooking) return res.status(404).json({ "message": "Booking couldn't be found" });
    // let see if we own this booking slot??/ idk words
    if (idOfUser !== testBooking.userId) return res.status(403).json({ "message": "Forbidden" });
    // lets see if the data from the body is valid
    if (start.getTime() >= end.getTime()) return res.status(400).json({
        "message": "Bad Request",
        "errors": {
            "endDate": "endDate cannot come before startDate"
        }
    })
    // lets check if the original endDate has already pasted
    if (start.getTime() <= now.getTime()) {
        return res.status(403).json({ "message": "Past bookings can't be modified" })
    }
    // we need to make sure there are no conflicts between any already booked dates
    const bookingConflict = await Booking.findAll({
        where: {
            id: idOfBooking
        },
    })
    //let iterate the array we get back from findAll and make comparisons and make a object to keep track of if there is a conflict
    const conflictObject = {};
    bookingConflict.forEach(booking => {
        console.log("booking", booking)
        // if the start is lesser than or equal to startDate AND end is greater than or equal to endDate
        if (start <= booking.startDate.getTime() && end >= booking.endDate.getTime()) {
            conflictObject.conflict = true
        };
        // if end is greater than the startDate AND end id lesser than or equal to endDate // we care comparing them as those long integers
        if (end > booking.startDate.getTime() && end <= booking.endDate.getTime() || start >= booking.startDate.getTime() && start < booking.endDate.getTime()) {
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
    // lets edit the existing booking
    const editBooking = await Booking.findByPk(idOfBooking)
    editBooking.startDate = startDate;
    editBooking.endDate = endDate;
    // lets make a safe response
    const safeBooking = {
        "id": editBooking.id,
        "spotId": editBooking.spotId,
        "userId": editBooking.userId,
        "startDate": editBooking.startDate,
        "endDate": editBooking.endDate,
        "createdAt": editBooking.createdAt,
        "updatedAt": editBooking.updatedAt
    }
    // lets save it to the database
    await editBooking.save()
    return res.status(200).json(safeBooking)
    /*


    const id = req.params.bookingId;
    // console.log('id', id);

    let { startDate, endDate } = req.body;
    console.log(req.body)

    const { user } = req

    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log('start', start);
    console.log('end', end)

    console.log("break 1 -----------------------------")

    const testBook = await Booking.findByPk(id)

    if (!testBook) {
        res.status(404);
        res.json({
            message: 'Booking couldn\'t be found'
        })
    }

    console.log("break 2 -----------------------------")

    if (testBook.userId !== user.id) {
        res.status(403)
        res.json({
            message: 'Forbidden'
        })
    }

    let book = await Booking.findAll({
        where: {
            id: id
        },

    })

    console.log('book', book);

    if (start > end) {
        res.status(400)
        res.json({
            "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    }

    console.log('break --------------------------------------')

    let test1 = false
    let test2 = false

    const testBooks = await Booking.findAll()
    console.log(testBook)

    testBooks.forEach(booking => {
        console.log('booking', booking)
        console.log('start.getTime()', start.getTime())
        console.log('booking.startDate.getTime()', booking.startDate.getTime())
        console.log('end.getTime()', end.getTime())
        console.log('booking.endDate.getTime()', booking.endDate.getTime())

        if (start.getTime() <= booking.startDate.getTime() && start.getTime() <= booking.endDate.getTime()) {
            test1 = true
        }

        if (end.getTime() <= booking.endDate.getTime()) {
            test2 = true
        }

        console.log('boolean', test1)
        console.log('boolean', test2)

        console.log('break ----------------------------------------')

        if (test1 && test2) {
            res.status(403)
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
        if (test1 || test2) {
            res.status(403)
            res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    })




    const now = new Date()
    console.log(now)

    if (now > end) {
        res.status(403);
        return res.json({
            message: 'Past bookings can\'t be modified'
        })
    }

    console.log("break 3 -----------------------------")

    testBook.dataValues.startDate = start.toISOString().split('T0')[0];
    testBook.dataValues.endDate = end.toISOString().split('T0')[0];

    console.log('EXAMPLE', start.toISOString())
    console.log('book.startDate', book.startDate)
    console.log('book.endDate', book.endDate)

    console.log("break 4 -----------------------------")

    await testBook.save();

    res.status(200);
    res.json(testBook)

    */

})

///  done  // with error handling
router.delete('/:bookingId', requireAuth, async (req, res) => {

    const id = req.params.bookingId;
    console.log(id);

    const bookingTest = await Booking.findByPk(id);
    console.log(bookingTest);

    // if the booking isnt found
    if (!bookingTest) {
        res.status(404);
        res.json({ message: 'Booking couldn\'t be found' });
    }

    console.log('break 1 ---------------------------------------')

    const { userId, spotId } = bookingTest
    console.log('userId', userId)
    console.log('spotId', spotId)

    const { user } = req
    console.log('user.id', user.id)

    // if the user isn't the owner
    if (userId !== user.id) {
        res.status(403);
        res.json({
            message: 'Forbidden'
        })
    }

    console.log('break 2 ---------------------------------------')


    const start = bookingTest.startDate.getTime()
    console.log('start', start)
    // console.log('start', start)

    const end = bookingTest.endDate.getTime()
    console.log('end', end)

    const date = new Date().getTime();
    console.log('date', date)

    // if the current  time is lesser then the startDate and the current time is greater than the endDates
    if (end > date && start < date) {
        res.status(403);
        res.json({
            message: 'Bookings that have been started can\'t be deleted'
        })
    }

    console.log('break 3 ------------------------------------')

    await bookingTest.destroy();

    const bookingTest2 = await Booking.findByPk(id);
    console.log(bookingTest2);


    res.status(200);
    res.json({
        message: 'Successfully deleted'
    })
})


module.exports = router
