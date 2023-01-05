//const jwt = require('jsonwebtoken');
const WEATHER_API_KEY = require('../config/openweather.json').key; // secalhar faz mais sentido meter uma key num .env
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const axios = require('axios').default;
const Compass = require("cardinal-direction");
const redisClient = require('../config/redis');

module.exports = class WeatherController{

    static async getWeatherByCity(req,res){
        try {

            // depois meter numa tabela no front e usar a geocode api e depois fazer call à api do current
            // weather com as coordenadas
            // pois pode existir cidades com nome igual em vários países


            // capitalize the first letter of the string
            const city = req.params.city.charAt(0).toUpperCase() + req.params.city.slice(1);
            const data = null

            if(redisClient.get(city) == null){
                const response = await axios.get(`${WEATHER_API_BASE_URL}?q=${city},${country}&appid=${WEATHER_API_KEY}`, 
                { headers: {'Content-type': 'application/json'}});

                const weather = {
                    city: response.data.city,
                    weather: response.data.weather[0].main,
                    weatherDescription: response.data.weather[0].description,
                    temperature: (response.data.main.temp - 273.15).toFixed(1),
                    humidity: response.data.main.humidity,
                    visibility: response.data.visibility,
                    wind: {
                        speed: (response.data.wind.speed * 3.6).toFixed(1),
                        direction: Compass.cardinalFromDegree(response.data.wind.deg, Compass.CardinalSubset.Ordinal),
                    },
                    time: new Date(response.data.dt * 1000)
                }

                await redisClient.set(city,weather);
                data = weather;
            } else {
                data = redisClient.get(city);
            }

            return res.send(data)
          
        } catch (error) {
            return res.status(400).send({ error: error.message/*'Weather fecthing failed'*/});
        }
    };


};

