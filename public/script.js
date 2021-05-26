// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// any console.log in this file will appear the browser console
console.log("Hello from script.js!")

// get axios from the window object. We added axios to the window from a CDN link in index.html
const axios = window.axios

// define variables that reference elements on our page
const mainContent = document.getElementById("main-content");

// a helper function that handles form submission
const submitForm = async (event) => {
  // This line prevents the page from reshing on form submit. By default, a form submission event refreshes the page
  event.preventDefault()  
  
  // get form values
  const { elements } = event.target
  const track = elements.track.value
  const artist = elements.artist.value
  
  // send 
  const result = await axios.post("/recommendations", { track, artist })
  // const recommendations = result.data
  
  console.log(result)
  
}


