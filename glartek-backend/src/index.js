const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const local = require('./config/passport')
const dotenv = require('dotenv').config()

const app = express();
const port = 3000;
const authRoute = require('./routes/auth.routes');
const weatherRoute = require('./routes/weather.routes');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/auth', authRoute)
app.use('/weather', weatherRoute)

//require('./controllers/AuthController')(app);
require('dotenv').config()


app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

