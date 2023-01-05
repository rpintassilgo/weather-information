const User = require('../models/User');

module.exports = class AuthController{

    static async register(req,res){
        try {
            // meter verificacoes e tal
            if(await User.findOne({ email: req.body.email })) 
                return res.status(400).send({ error: 'User already exists' })

            const user = await User.create(req.body);
            user.password = undefined;
    
            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Registration failed'*/});
        }
    };

};

