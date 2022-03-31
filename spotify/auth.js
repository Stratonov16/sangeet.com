const axios= require("axios")

const qs= require("qs")


const spotifyAccessTokenURL = "https://accounts.spotify.come/api/token";
const encodedToken = Buffer.from(
  process.env.SPOTIFY_CLIENT_ID + "+process.env.SPOTIFY_CLIENT_SECRET"
).tostring("base64"); //has to be in format of base64, through documentation
const getAccessToken = async () => {};
module.export = { getAccessToken };
