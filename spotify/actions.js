const axios = require('axios');

const getRecommendations = async (http, { trackId }) => {
  const params = trackId ? { seed_tracks: trackId } : { seed_genres: 'pop,rock,hip-hop' }; // Example genres
  const result = await http.get('https://api.spotify.com/v1/recommendations', {
    params: {
      limit: 10,
      ...params,
    },
  });
  return result.data;
};

const searchTracks = async (http, { track, artist }) => {
  const result = await http.get('https://api.spotify.com/v1/search', {
    params: {
      q: `track:${track} artist:${artist}`,
      type: 'track',
      limit: 1,
    },
  });
  return result.data;
};

module.exports = { searchTracks, getRecommendations };
