const Weather = require('../models/Weather');
//const jwt = require('jsonwebtoken');
//const authConfig = require('../config/auth.json');

module.exports = class WeatherController{

    static async register(req,res){
        try {
            /*
            if(await User.findOne({ email: req.body.email })) 
                return res.status(400).send({ error: 'User already exists' })
            */

            const weather = await Weather.create(req.body);
            user.password = undefined;
    
            // token sent so that the user can login automatically after the registration
            return res.send({ weather });
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Weather fecthing failed'*/});
        }
    };


};

