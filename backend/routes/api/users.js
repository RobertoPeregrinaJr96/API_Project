const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// GET current User
router.get('/', requireAuth, async (req, res) => {

    const { user } = req
    console.log(user)

    if (!user) {
        res.status(404);
        res.json({
            message: null
        })
    }

    const { id, username, email, firstName, lastName } = user

    res.status(200);
    res.json({
        user: {
            id,
            firstName,
            lastName,
            email,
            username
        }
    })
})


// GET all users
router.get('/', requireAuth, async (req, res) => {

    const users = await User.findAll()

    if (!users) {
        res.status(401);
        res.json({
            message: 'Authentication required'
        })
    }
    res.status(200);
    res.json(users)
})

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Last Name is required'),
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

// Sign up /api/users        <error handling done?>
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    const hashedPassword = bcrypt.hashSync(password);

    const usersEmail = await User.findOne({
        where: {
            email
        }
    })
    const usersUsername = await User.findOne({
        where: {
            username
        }
    })

    if (usersEmail) {
        res.status(500);
        res.json({
            "message": "User already exists",
            "errors": {
                "email": "User with that email already exists"
            }
        })
    }
    if (usersUsername) {
        res.status(500);
        res.json({
            "message": "User already exists",
            "errors": {
                "email": "User with that username already exists"
            }
        })
    }

    const user = await User.create({
        email,
        username,
        hashedPassword,
        firstName,
        lastName
    });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,

    };


    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}
);


module.exports = router;
