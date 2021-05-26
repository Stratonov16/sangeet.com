// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/) and axios (https://www.npmjs.com/package/axios)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const axios = require("axios");
const { getAccessToken } = require("./spotify/auth");
const { searchTracks, getRecommendations } = require("./spotify/actions");

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
  if(!req.body) {
    res.status(400).send({ status: "error", message: "Bad Request - must send a JSON body with track and artist" })
  }
  
  console.log(req)
  const { track, artist } = req.body
  
  if(!track || !artist) {
    res.status(400).send({ status: "error", message: "Bad Request - must past a track and artist" })
  }
  
  // first, try to get access token from Spotify 
  let accessToken;
  
  try {
    accessToken = await getAccessToken()
  } catch(err) {
    console.error(err.message)
    res.status(500).send({ status: "error", message: "Internal Server Error"})
  }  
  console.log({accessToken})
  
  // otherwise, start workflow
  
  // 1. get track id from search
  
  let trackId;
  
  try {
    const tracks = await searchTracks(accessToken, { track: 'dancing queen', artist: 'abba'})
    
    // if no songs returned in search, send a 404 response
    if(!tracks || !tracks.items || !tracks.items.length ) {
      res.status(404).send({ message: "Song not found." })
    }
    
    // save the first search result's trackId to a cariable
    trackId = tracks.items[0].id
  } catch(err) {
    console.error(err.message)
    res.status(500).send({ status: "error", message: "Error when searching tracks" })
  }
  
  // 2. get song recommendations
  try {
    const recommendations = await getRecommendations(accessToken, { trackId })
    
    // if no songs returned in search, send a 404 response
    if(!recommendations || !recommendations.tracks || !recommendations.tracks.length ) {
      res.status(404).send({ message: "No recommendations found." })
    }
    
    // get the top three recommendations
    const topThree = recommendations.tracks.slice(0,3)
    
    // Success! Send recommendations back to client
    res.send({ recommendations: topThree })
  } catch(err) {
    console.error(err.message)
    res.status(500).send({ status: "error", message: "Internal Server Error" })
  }
});


// after our app has been set up above, start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});

