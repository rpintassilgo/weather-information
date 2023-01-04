const User = require('../models/User');
//const bcrypt = require('bcrypt')

module.exports = class AuthController{

    register = async (req,res) => {
        try {
            // meter verificacoes e tal
            const User = await User.create(req.body);
    
            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed'});
        }
    };

};

