const express = require('express');
const router = express.Router();
const getWeather = require('./get-weather');

router.get('/weather', getWeather);

module.exports = router;
