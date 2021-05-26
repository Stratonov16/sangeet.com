// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

// define variables that reference elements on our page
const mainContent = document.getElementById("main-content");

// a helper function that creates a list item for a given dream
function submitForm(event) {
  event.preventDefault() // prevent page from refreshing 
  const formData = new FormData(event.target);
  console.log(formData)
  
  
}


