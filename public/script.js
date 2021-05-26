// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log(global.axios)
console.log("hello world :o");

// define variables that reference elements on our page
const mainContent = document.getElementById("main-content");

// a helper function that handles form submission
const submitForm = (event) => {
  event.preventDefault() // prevent page from refreshing 
  const { elements } = event.target
  
  // get form values
  const track = elements.track.value
  const artist = elements.artist.value
  
  // send 
  
  
  
  
  
}


