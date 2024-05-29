<<<<<<< HEAD
const axios = require("axios");
const qs = require("qs");

const SPOTIFY_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
  const unencodedToken =
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET;
  console.log(`Unencoded token in auth.js ${unencodedToken}`);
  
  const encodedToken = Buffer.from(unencodedToken).toString("base64");

  // console.log(`Encoded token in auth.js ${encodedToken}`);

  const data = qs.stringify({ grant_type: "client_credentials" });
  
    console.log(`Data in auth.js ${data}`);

  const authOptions = {
    method: "post",
    url: SPOTIFY_ACCESS_TOKEN_URL,
    headers: {
      "Authorization": `Basic ${encodedToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data
  };

  return axios(authOptions).then((res) => res.data.access_token);
};

module.exports = { getAccessToken };
=======
const axios= require("axios")

const qs= require("qs")


const getAccessToken = async () => {
  
const spotifyAccessTokenURL = "https://accounts.spotify.come/api/token";
const encodedToken = Buffer.from(
  process.env.SPOTIFY_CLIENT_ID + "+process.env.SPOTIFY_CLIENT_SECRET"
).tostring("base64"); //has to be in format of base64, through documentation
  const  data = qs.stringify({grant _type:"client_credentials"});
};
module.export = { getAccessToken };
>>>>>>> origin/main
