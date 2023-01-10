const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const regexExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

module.exports = class AuthController{

    static async register(req,res){
        try {
            // Validation
            if(req.body.name === undefined || req.body.password === undefined) 
                return res.status(400).send({ error: 'Empty fields' })

            if(!regexExpEmail.test(req.body.email)) 
                return res.status(400).send({ error: 'Invalid email' })

            // End of validation

            if(await User.findOne({ email: req.body.email })) 
                return res.status(400).send({ error: 'User already exists' })

            const user = await User.create(req.body);
            user.password = undefined;
    
            return res.send({ user });
        } catch (error) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    };


    static async logout(req,res){
        try {
            res.clearCookie('connect.sid')
            return res.send(req.user);
        } catch (error) {
            return res.status(400).send({ error: 'Logout error' });
        }
    }


    

};

