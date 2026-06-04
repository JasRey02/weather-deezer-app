function getMusicByWeather(weather) {

    const weatherMap = {

        Clear: 'summer vibes',

        Clouds: 'indie chill',

        Rain: 'lofi',

        Drizzle: 'jazz',

        Thunderstorm: 'rock',

        Snow: 'acoustic',

        Mist: 'ambient',

        Fog: 'ambient'
    };

    return weatherMap[weather] || 'top hits';
}

module.exports = {
    getMusicByWeather
};