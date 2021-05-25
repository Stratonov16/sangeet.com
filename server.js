// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/) and axios (https://www.npmjs.com/package/axios)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const axios = require("axios");

// initialize an instance of express called 'app' 
const app = express();

// get 
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID 
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET 
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
  console.error('ERROR: Missing one or more critical Spotify environment variables. Check .env file')
}

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the index.html file when a GET request is made to the root path "/"
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (request, response) => {
  // TODO
  console.log(request);
});

// after our app has been set up above, start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});

