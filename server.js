const express = require("express");

const app = express(); // initialize an express instance called 'app'
const axios = require("axios");
const { getAccessToken } = require("./spotify/auth.js")
const { searchTracks, getRecommendations } = require("./spotify/actions.js")

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

app.post("/recommendations", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Not working bruh, Retry" })
  }
  const { track, artist } = req.body;

  let accessToken;
  try {
    accessToken = await getAccessToken();
    console.log("authentication successful")
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ message: "Something went wrong when fetching access token" })
  }

  const http = axios.create({
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!track && !artist) {
    // Random recommendation logic
    try {
      const result = await getRecommendations(http, {});
      const { tracks } = result;

      if (!tracks || !tracks.length) {
        return res.status(404).send({ message: "No recommendations found." })
      }

      return res.send({ tracks });
    } catch (err) {
      console.error(err.message);
      console.log("iamnick random error")
      return res
        .status(500)
        .send({ message: "Something went wrong when getting recommendations" })
    }
  }

  let trackId;
  try {
    const result = await searchTracks(http, { track, artist });
    const { tracks } = result;
    if (!tracks || !tracks.items || !tracks.items.length) {
      return res
        .status(404)
        .send({ message: `Song ${track} by ${artist} not found.` })
    }

    trackId = tracks.items[0].id;
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send({ message: "Something went wrong when searching tracks" })
  }

  try {
    const result = await getRecommendations(http, { trackId })
    const { tracks } = result

    if (!tracks || !tracks.length) {
      return res.status(404).send({ message: "No recommendations found." })
    }

    return res.send({ tracks });
  } catch (err) {
    console.error(err.message);
    console.log("iamnick  error")

    return res
      .status(500)
      .send({ message: "Something went wrong when getting recommendations" })
  }
});

// start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});
