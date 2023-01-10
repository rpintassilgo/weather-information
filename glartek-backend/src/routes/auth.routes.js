const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/authenticate', passport.authenticate('local', { failureMessage: 'Invalid email or password'}), (req,res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
    }
    res.send(user);
})
//router.get('/me', controller.getLoggedUser)

module.exports = router;