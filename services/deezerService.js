const axios = require('axios');

async function searchTracks(query) {

    const response = await axios.get(
        'https://api.deezer.com/search',
        {
            params: {
                q: query
            }
        }
    );

    return response.data;
}

module.exports = {
    searchTracks
};