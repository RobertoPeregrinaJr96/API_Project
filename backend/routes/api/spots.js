const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');
const { route } = require('./session');
const { Model } = require('sequelize');


const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {

    const spots = await Spot.findAll()
    // console.log(spots)

    res.status(200)
    res.json(spots)

})

// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {

    const { user } = req
    console.log(user)

    const { id } = user
    console.log(id)

    const userSpots = await Spot.findAll({
        where: {
            ownerId: id
        }
    })

    console.log(userSpots)

    res.json(userSpots)
})

// Create a Spot
router.post('/', async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId
    })

    console.log(newSpot)

    await newSpot.save();

    res.status(201)
    res.json(newSpot)
})

module.exports = router
