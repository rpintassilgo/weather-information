const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.get('/', (req,res) => {
    res.send('OK');
});
router.post('/register', controller.register);


module.exports = router;