const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// GET all users
router.get('/', async (req,res)=>{

    const users = await User.findAll()

    if(!users){
        res.status(401);
        res.json({
            message:'Authentication required'
        })
    }
    res.status(200);
    res.json(users)
})

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true }),
    check('lastName')
        .exists({ checkFalsy: true }),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up /api/users
router.post('', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    // console.log('email', email)
    // console.log('password', password)
    // console.log('username', username)
    // console.log('firstName', firstName)
    // console.log('lastName', lastName)
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,

    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}
);






module.exports = router;
