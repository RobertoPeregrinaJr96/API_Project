const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, ReviewImage, Spot } = require('../../db/models');


const router = express.Router();

// GET all reviews of current User
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
        include: {
            model: Spot
        },
        where: {
            userId: id
        }
    })

    console.log(userReview)

    res.status(200)
    res.json(userReview)
})


module.exports = router
