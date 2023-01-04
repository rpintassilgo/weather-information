const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//require('./controllers/AuthController')(app);


app.listen(port, () => {
    console.log(`Application is listening at port ${port}`);
});

