const axios = require('axios');

async function getWeather(city) {

    const apiKey = process.env.WEATHER_API_KEY;

    const response = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    return response.data;
}

async function getWeatherByCoords(lat, lon) {

    const apiKey = process.env.WEATHER_API_KEY;

    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    return response.data;
}

module.exports = {
    getWeather,
    getWeatherByCoords
};