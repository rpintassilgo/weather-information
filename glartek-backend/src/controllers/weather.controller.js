const axios = require('axios').default;
const Compass = require("cardinal-direction");
const redisClient = require('../config/redis');
const luxon = require('luxon')
const lookup = require('country-code-lookup')
const jsonStringifySafe = require('json-stringify-safe');

module.exports = class WeatherController{

    static async getCoordinatesByCityName(req,res){
        const city = req.params.city;
        let data = null;

        // check if the key is set
        const exists = await redisClient.get(`geo/${city}`) == null ? false : true

        console.log("teste: " + process.env.GEO_API_URL);

        try {
            if(!exists){
                const response = await axios.get(`${process.env.GEO_API_URL}?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`, 
                { headers: {'Content-type': 'application/json'}});
                
                response.data.forEach(el => el.country = lookup.byIso(el.country).country);
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

                console.log(response.data.dt)
                const weather = {
                    city: response.data.city,
                    weather: {
                        main: response.data.weather[0].main,
                        description: response.data.weather[0].description,
                        icon: response.data.weather[0].icon,
                    },
                    temperature: (response.data.main.temp - 273.15).toFixed(1),
                    humidity: response.data.main.humidity,
                    visibility: response.data.visibility,
                    wind: {
                        speed: (response.data.wind.speed * 3.6).toFixed(1),
                        direction: Compass.cardinalFromDegree(response.data.wind.deg, Compass.CardinalSubset.Ordinal),
                    },
                    time: luxon.DateTime.fromSeconds(response.data.dt).toFormat('yyyy/MM/dd HH:mm:ss')
                }
                
                await redisClient.set(coordinates,JSON.stringify(weather));
                await redisClient.expire(coordinates,1800);

                data = weather;
            } else {
                data = JSON.parse(await redisClient.get(coordinates));
            }

            return res.send(data)
          
        } catch (error) {
            return res.status(400).send({ error: 'Weather API failed' });
        }
    };

    // by coordinates or city id
    static async getForecast(req,res){
        let data = null
        
        const city = {
            id: req.query.cityid,
            lat: req.query.lat,
            lon: req.query.lon,
        };

        if(!((city.id !== undefined && city.lat === undefined && city.lon === undefined) ||
           (city.id === undefined && city.lat !== undefined && city.lon !== undefined))) 
            return res.status(400).send({ error: 'Invalid query parameters' });
        
        const isCoordinates = city.id === undefined ? true : false;
        
        console.log(city)
        
        // check if the key is set
        const exists = await redisClient.get(JSON.stringify(city)) == null ? false : true
        
        try {
            if(!exists){
                
                const url = isCoordinates == false ? `${process.env.FORECAST_API_URL}?id=${city.id}&cnt=5&appid=${process.env.OPEN_WEATHER_API_KEY}` :
                            `${process.env.FORECAST_API_URL}?lat=${city.lat}&lon=${city.lon}&cnt=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;
                
                const response = await axios.get(url, 
                { headers: {'Content-type': 'application/json'}});
                
                let forecast = []
                response.data.list.forEach(el => {
                    forecast.push({
                        city: el.city,
                        weather: {
                            main: el.weather[0].main,
                            description: el.weather[0].description,
                        },
                        temperature: (el.main.temp - 273.15).toFixed(1),
                        humidity: el.main.humidity,
                        visibility: el.visibility,
                        wind: {
                            speed: (el.wind.speed * 3.6).toFixed(1),
                            direction: Compass.cardinalFromDegree(el.wind.deg, Compass.CardinalSubset.Ordinal),
                        },
                        time: luxon.DateTime.fromSeconds(el.dt).toFormat('yyyy/MM/dd HH:mm:ss')
                    })
                }) 

                await redisClient.set(JSON.stringify(city),jsonStringifySafe(forecast));
                await redisClient.expire(JSON.stringify(city),1800);
        
                data = forecast;
            } else {
                data = JSON.parse(await redisClient.get(JSON.stringify(city)));
            }

            return res.send(data)
          
        } catch (error) {
            return res.status(400).send({ error: 'Forecast API failed' });
        }
    };

};

