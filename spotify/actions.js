const BASE_URL = "https://api.spotify.com/v1";

const searchTracks = async (http, { track, artist }) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/search?q=track:${track}+artist:${artist}&type=track`,
  };

  return http(config).then((response) => response.data);
};

const getRecommendations = async (http, { trackId }) => {
  const config = {
    method: "get",
    url: `${BASE_URL}/recommendations?seed_tracks=${trackId}`,
  };
  return http(config).then((response) => response.data);
};

module.exports = { searchTracks , getRecommendations};
