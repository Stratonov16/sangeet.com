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
