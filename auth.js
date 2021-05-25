// Spotify auth scopes permitted for this application
const AUTH_SCOPE = "user-read-private user-read-email";

const SPOTIFY_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token"

const authOptions = {
  url: SPOTIFY_ACCESS_TOKEN_URL, 
  headers: {
    'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
  },
  data: {
    grant_type: 'client_credentials'
  },
  json: true
};