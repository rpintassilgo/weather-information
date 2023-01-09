const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/login', passport.authenticate('local'), (req,res) => res.send(200));

module.exports = router;