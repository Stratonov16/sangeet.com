// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/) and axios (https://www.npmjs.com/package/axios)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const axios = require("axios");
const { getAccessToken } = require("./spotify/auth");
const { searchTracks } = require("./spotify/actions");

// initialize an instance of express called 'app' 
const app = express();

// Log an error message if any of the secret values needed for this app are missing
if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.error("ERROR: Missing one or more critical Spotify environment variables. Check .env file");
}


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the index.html file when a GET request is made to the root path "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/recommendations", async (req, res) => {
  let accessToken;
  
  // first, try to get access token from Spotify 
  try {
    accessToken = await getAccessToken()
  } catch(err) {
    // if failed, send back a failed response
    console.error(err.message)
    res.status(500).send({ status: "error", message: "Internal Server Error"})
  }  
  
  // otherwise, start workflow
  
  // 1. get track id from search
  
  const tracks = await searchTracks(accessToken, { track: 'dancing queen', artist: 'abba'})
  console.log({tracks})
  
  // 2. get song recommendations
});


// after our app has been set up above, start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});

