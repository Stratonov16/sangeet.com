// client-side js, loaded by index.html. Run when web page is loaded

// // any console.log in this file will appear the browser console
// console.log("Hello from script.js!")
const axios = window.axios;


const submitForm = async (event)=>{ //to handle network issue while submitting use async
  event.preventDefault();
  const { elements} = event.target
  const track = elements.track.value;
  const artist = elements.artist.value;
  console.log({artist, track});
  try{
  const result = await axios.post("/recommendations", {track, artist});
  }
  catch(err ){
    return alert(err.message);
  }
};
