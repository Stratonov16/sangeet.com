const axios = require("axios")
const qs = require("qs")

const BASE_URL = "https://api.spotify.com/v1"

// uses Spotify's Search API to search tracks by track name and artist
const searchTracks = (accessToken, { track, artist }) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}/search?q=track:${track}+artist:${artist}&type=track`,
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
}

/// uses Spotify's Search API to search tracks by track name and artist
const getRecommendations = (accessToken, { trackId }) => {
  const config = {
    method: 'get',
    url: `${BASE_URL}/recommendations?seed_tracks=${trackId}`,
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
}

module.exports = { searchTracks }