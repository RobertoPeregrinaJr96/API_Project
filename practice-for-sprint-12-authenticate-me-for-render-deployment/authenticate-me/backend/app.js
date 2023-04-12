const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


/*
this will check if we are in production are not
and assign the result to the isProduction variable
*/
const { environment } = require('./config');
const isProduction = environment === 'production';

//we will initialize Express
const app = express();

//we will connect middleware from morgan to log information about request and response
app.use(morgan('dev'));

/*
by connections cookieParser we can parse incoming cookie data
we are also able to parse json
 */
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
})
);

// Set the _csrf token and create req.csrfToken method
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
})
);

const routes = require('./routes');


app.use(routes); // Connect all the routes





module.exports = app;
