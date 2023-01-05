const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = class AuthController{

    static generateToken(params = {}){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400, // 1 day
        })
    }

    static async register(req,res){
        try {
            // meter verificacoes e tal
            if(await User.findOne({ email: req.body.email })) 
                return res.status(400).send({ error: 'User already exists' })

            const user = await User.create(req.body);
            user.password = undefined;
    
            // token sent so that the user can login automatically after the registration
            return res.send({ user, token: AuthController.generateToken({ id: user.id }) });
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Registration failed'*/});
        }
    };

    static async autheticate(req,res){
        const user = await User.findOne({ email: req.body.email }).select('+password');

        if(!user) return res.status(400).send({ error: 'User not found' });

        if(!await bcrypt.compare(req.body.password, user.password)) 
            return res.status(400).send({ error: 'Invalid password' });

        user.password = undefined;

        res.send({ user, token: AuthController.generateToken({ id: user.id }) });
    }

};

