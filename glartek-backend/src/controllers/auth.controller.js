const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = class AuthController{

    static async register(req,res){
        try {
            // meter verificacoes e tal
            if(await User.findOne({ email: req.body.email })) 
                return res.status(400).send({ error: 'User already exists' })

            const user = await User.create(req.body);
            user.password = undefined;
    
            // token sent so that the user can login automatically after the registration
            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Registration failed'*/});
        }
    };

    
    static async autheticate(req,res){
        try {
            const passport = passport.authenticate('local', { failureRedirect: '/login'})
            console.log("passport: " + passport)
            //return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Registration failed'*/});
        }
    }

    static async logout(req,res){
        try {
            res.clearCookie('connect.sid')
            return res.send(req.user);
        } catch (error) {
            return res.status(400).send({ error: /*'Logout error'*/error.message  });
        }
    }


    

};

