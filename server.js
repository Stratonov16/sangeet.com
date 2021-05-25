// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/) and axios (https://www.npmjs.com/package/axios)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const querystring = require("querystring");
const axios = require("axios");

// initialize an instance of express called 'app' 
const app = express();

const AUTH_STATE_KEY = "spotify_auth_state";
const AUTH_SCOPE = "user-read-private user-read-email";

// get secret values
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
  console.error("ERROR: Missing one or more critical Spotify environment variables. Check .env file");
}

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the index.html file when a GET request is made to the root path "/"
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (request, response) => {
  // get the current date in epoch time - we will use this as a unique key
  const state = new Date.toISOString();
  //set up the response to send a cookie to the browser
  response.cookie(AUTH_STATE_KEY, state);
  // build authorization url 
  const authUrl = "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: 'code',  // for Authorization Code grant type
      client_id: SPOTIFY_CLIENT_ID,
      scope: AUTH_SCOPE,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      state: state
    })
  // redirect user to authUrl so they can grant permission to access Spotify
  response.redirect(authUrl);
});

// after our app has been set up above, start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});

