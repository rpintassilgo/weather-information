const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = class AuthController{

    static generateToken(params = {}){ // trocar para sha512
        return jwt.sign(params, process.env.CLIENT_SECRET, {
            expiresIn: 3600,//86400, // 1 day
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

    /*
    static async autheticate(req,res){
        passport.authenticate(req,res)
    }
    */

};

