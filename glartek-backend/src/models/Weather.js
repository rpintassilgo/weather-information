const mongoose = require('../database/index');
const Schema = mongoose.Schema;

const WeatherSchema = Schema({
    city: {
        type: String,
        require: true,
    },
    weather: {
        type: String,
        required: true,
    },
    weatherDescription: {
        type: String,
        required: true,
    },
    temperature: { // celsius
        type: Number,
        required: true,
    },
    humidity: { // percentagem
        type: Number,
        required: true,
    },
    visibility: { // em metros (max: 10km)
        type: Number,
        required: true,
    },
    wind: {
        speed: {
            type: Number,
            required: true,
        },
        direction: { // meter os graus em ponto cardeal
            type: String,
            required: true,
        },
    },
    time: { // meter num formato decente e nao unix 
        type: Date,
        required: true,
    },
});


const Weather = mongoose.model('Weather', WeatherSchema);
module.exports = Weather;