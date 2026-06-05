require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/api/test', (req, res) => {
    res.json({
        mensaje: 'Servidor funcionando'
    });
});


const {
    getWeather,
    getWeatherByCoords
} = require('./services/weatherService');

app.get('/api/weather/:city', async (req, res) => {

    try {

        const weather = await getWeather(req.params.city);

        res.json({
            ciudad: weather.name,
            pais: weather.sys.country,
            temperatura: weather.main.temp,
            clima: weather.weather[0].main,
            descripcion: weather.weather[0].description,
            humedad: weather.main.humidity
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.get('/api/location/:lat/:lon', async (req, res) => {

    try {

        const weather =
            await getWeatherByCoords(
                req.params.lat,
                req.params.lon
            );

        const clima =
            weather.weather[0].main;

        const genero =
            getMusicByWeather(clima);

        const songs =
            await searchTracks(genero);

        const canciones = songs.data
            .slice(0, 10)
            .map(song => ({
                titulo: song.title,
                artista: song.artist.name,
                album: song.album.title,
                portada: song.album.cover_medium,
                preview: song.preview,
                enlace: song.link
            }));

        res.json({
            ciudad: weather.name,
            temperatura: weather.main.temp,
            sensacion: weather.main.feels_like,
            humedad: weather.main.humidity,
            viento: weather.wind.speed,
            descripcion: weather.weather[0].description,
            clima,
            recomendacion: genero,
            icon: weather.weather[0].icon,
            canciones
        });

    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});


const { searchTracks } = require('./services/deezerService');
const { getMusicByWeather } = require('./services/musicRecommendation');

app.get('/api/deezer/:query', async (req, res) => {

    try {

        const result = await searchTracks(req.params.query);

        res.json(result);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            error: error.message
        });

    }

});

app.get('/api/recommendation/:city', async (req, res) => {

    try {

        const weather = await getWeather(req.params.city);

        const clima = weather.weather[0].main;

        const genero = getMusicByWeather(clima);

        const songs = await searchTracks(genero);

        const canciones = songs.data
            .slice(0, 10)
            .map(song => ({
                titulo: song.title,
                artista: song.artist.name,
                album: song.album.title,
                portada: song.album.cover_medium,
                preview: song.preview,
                enlace: song.link
            }));

        res.json({
            ciudad: weather.name,
            temperatura: weather.main.temp,
            sensacion: weather.main.feels_like,
            humedad: weather.main.humidity,
            viento: weather.wind.speed,
            descripcion: weather.weather[0].description,
            clima,
            recomendacion: genero,
            icon: weather.weather[0].icon,
            canciones
        });
        console.log(weather.weather[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});