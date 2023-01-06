const axios = require('axios').default;
const Compass = require("cardinal-direction");
const redisClient = require('../config/redis');

module.exports = class WeatherController{

    static async getCoordinatesByCityName(req,res){
        const city = req.params.city;
        let data = null;

        // check if the key is set
        const exists = await redisClient.get(`geo/${city}`) == null ? false : true

        console.log("teste: " + process.env.GEO_API_URL);

        try {
            if(!exists){
                const response = await axios.get(`${process.env.GEO_API_URL}?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`, 
                { headers: {'Content-type': 'application/json'}});
                
                // verificar depois se ha problema, quando a string for demasiado grande (acho q nao)
                await redisClient.set(`geo/${city}`,JSON.stringify(response.data));

                data = response.data;
            } else {
                data = JSON.parse(await redisClient.get(`geo/${city}`));
            }

            return res.send(data)
            
        } catch (error) {
            return res.status(400).send({ error: "Erro coordinates: " + error.message/*'Unavaiable'*/});
        }
    }

    static async getWeatherByCoordinates(req,res){
        const coordinates = `${req.query.lat}|${req.query.lon}`;
        let data = null

        // check if the key is set
        const exists = await redisClient.get(coordinates) == null ? false : true

        try {
            if(!exists){
                const response = await axios.get(`${process.env.WEATHER_API_URL}?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`, 
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
                
                await redisClient.set(coordinates,JSON.stringify(weather));
                await redisClient.expire(coordinates,1800);

                data = weather;
            } else {
                data = JSON.parse(await redisClient.get(coordinates));
            }

            return res.send(data)
          
        } catch (error) {
            return res.status(400).send({ error: "Erro weather: " + error.message/*'Weather fecthing failed'*/});
        }
    };

};

