const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/authenticate', controller.autheticate);

module.exports = router;