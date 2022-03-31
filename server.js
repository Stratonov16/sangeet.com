// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// you can always use whatever libraries or frameworks you'd like through `package.json` > "Add package".
const express = require("express");

const app = express(); // initialize an express instance called 'app'
const axios = require("axios");
const { getAccessToken } = require("./spotify/auth.js");
const { searchTracks, getRecommendations } = require("./spotify/actions.js");

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.error("ERROR: Missing one or more crucial spotify variables.");
}

app.use(express.json()); // set up the app to parse JSON request bodies

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the public/index.html file when a GET request is made to the root path "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/recommendations", async(req, res) => {
  if (!req.body) {
    //if proper body is not made then error message
    return res.status(400).send({ message: "Not working bruh, Retry" });
  }
  const { track, artist } = req.body;
  if (!track || !artist) {
    //if both are not put
    return res
      .status(400)
      .send({ message: "Put both song and artist name for better result" });
  }

  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ message: "Something went wrong when fetching access token" });
  }

  const http = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  let trackId;
  try {
    const result = await searchTracks(http, { track, artist });
    const { tracks } = result;

    if (!tracks || !tracks.items || !tracks.items.length) {
      return res
        .status(404)
        .send({ message: `Song ${track} by ${artist} not found.` });
    }

    trackId = tracks.items[0].id;
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ message: "Something went wrong when searching tracks" });
  }

  console.log(trackId);

  try {
    const result = await getRecommendations(http, { trackId })
    const { tracks } = result

    // if no songs returned in search, send a 404 response
    if(!tracks || !tracks.length ) {
      return res.status(404).send({ message: "No recommendations found." })
    }
    
    // Success! Send track recommendations back to client
    return res.send({ tracks })
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ message: "Something went wrong when getting recommendations" });
  }

  res.send({ message: "OK" });
});

// start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`My app listening at port ${process.env.PORT}`);
});
