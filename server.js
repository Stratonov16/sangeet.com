const express = require("express");
const axios = require("axios");

// initialize an express instance called 'app' 
const app = express();

// set up the app to parse JSON request bodies
app.use(express.json());

app.use(express.static("public"));

// return the index.html file when a GET request is made to the root path "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});

