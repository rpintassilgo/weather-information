const express = require('express');
const router = express.Router();

const controller = require('../controllers/weather.controller');

router.get('/:city', controller.getWeatherByCity);

module.exports = router;