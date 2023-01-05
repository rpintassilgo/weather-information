const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const authRoute = require('./routes/auth.routes');
const weatherRoute = require('./routes/weather.routes');

//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoute)
app.use('/weather', weatherRoute)

//require('./controllers/AuthController')(app);


app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

