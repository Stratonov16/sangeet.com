const axios = require("axios")
const { toBase64 } = require("./utils/base64")

// Spotify auth scopes permitted for this application
const AUTH_SCOPE = "user-read-private user-read-email";

const SPOTIFY_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token"


const getAccessToken = async () => {
  // Spotify requires a base64 encoded token made of the Client ID and Client Secret joined with ":"
  const encodedToken = toBase64(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)

  const authOptions = {
    url: SPOTIFY_ACCESS_TOKEN_URL, 
    headers: {
      'Authorization': 'Basic ' + encodedToken
    },
    data: {
      grant_type: 'client_credentials'
    }
  };
  
  // Make a post request with axios to Spotify to get access token with client credentials
  const accessToken = await axios.post(authOptions)
  return accessToken
}

// export the getAccessToken function so we can use it in server.js
module.exports = { getAccessToken }

