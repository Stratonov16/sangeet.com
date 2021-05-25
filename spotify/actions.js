const axios = require("axios")
const qs = require("qs")

/// uses Spotify's Search API to search tracks by track name and artist
const searchTracks = (accessToken, { track, artist }) => {
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=track:${track}+artist:${artist}&type=track`,
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { searchTracks }