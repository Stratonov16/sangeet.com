// client-side js, loaded by index.html. Run when web page is loaded

// any console.log in this file will appear the browser console
console.log("Hello from script.js!")

const clearInput = () => {
  const input = document.getElementsByTagName("input")[0];
  input.value = "";
}

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearInput);

