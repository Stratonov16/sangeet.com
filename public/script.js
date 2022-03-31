// client-side js, loaded by index.html. Run when web page is loaded

// // any console.log in this file will appear the browser console
// console.log("Hello from script.js!")


const submitForm = (event)=>{
  const { elements} = event.target
  const track = elements.track.value;
  console.log(event);
  
};
