const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({ email: email }) 
        if(user) done(null,user) 
    } catch (error) {
        console.log("deserializeUser error: " + error)
        done(error,false)
    }
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username }).select('+password')
        //console.log(user)
        
        if(!user) done(null,false)
    
        //console.log("passou ? ")
        if(bcrypt.compareSync(password, user.password)){
            done(null,user)
            console.log("pw igual")
        } else{
            done(null,false)
        }
            
            
    } catch (error) {
        console.log(error)
        done(error, false)
    }
  }
))