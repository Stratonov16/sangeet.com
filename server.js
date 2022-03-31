// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// you can always use whatever libraries or frameworks you'd like through `package.json` > "Add package".
const express = require("express");

const app = express(); // initialize an express instance called 'app'

app.use(express.json()); // set up the app to parse JSON request bodies

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// return the public/index.html file when a GET request is made to the root path "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/recommendations", (req, res) => {
  if (!req.body) {
    //if proper body is not made then error message
    return res.status(400).send({ message: "Not working bruh, Retry" });
  }
  const { track, artist } = req.body;
  if (!track || !artist) {
    //if both are not put
    return res
      .status(400)
      .send({ message: "Put both song and artist for better result" });
  }
  res.send({ message: "ok" });
});

// start listening on a port provided by Glitch
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at port ${process.env.PORT}`);
});
