const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/auth/register', controller.register);
router.get('/', (req,res) => {
    res.send('OK');
});

module.exports = router;