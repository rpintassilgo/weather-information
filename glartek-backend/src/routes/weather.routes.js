const express = require('express');
const router = express.Router();

const controller = require('../controllers/weather.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/:city', controller.getCoordinatesByCityName);
router.get('/', controller.getWeatherByCoordinates);

module.exports = router;