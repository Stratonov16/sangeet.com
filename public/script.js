// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// any console.log in this file will appear the browser console
console.log("Hello from script.js!")

// get Hadnlebars and axios from the window object. We added these to the window from a CDN link in index.html
const handlebars = window.Handlebars
const axios = window.axios

// get elements from the DOM 
const output = document.getElementById("recommendation-output");
const button = document.getElementById("submitButton");

// helper function that gets called on form submission
const submitForm = async (event) => {
  try {
    // This line prevents the page from reshing on form submit. By default, a form submission event refreshes the page
    event.preventDefault()  
    disableButton()
    // get form values
    const { elements } = event.target
    const track = elements.track.value
    const artist = elements.artist.value

    // send a POST request to the backend /recommendations path to get song recommendations
    const result = await axios.post("/recommendations", { track, artist })
    const recommendations = result.data.tracks

    // get top 3 recommendations
    const topThreeRecs = recommendations.slice(0,3)

    const template = handlebars.compile(templateRaw)
    const recommendationsHtml = template({ track, topThreeRecs })

    // set the recommendation output's inner html do the resolved temple
    output.innerHTML = recommendationsHtml
  } catch(err) {
    // show a pop up error message if something goes wrong
    alert("Something went wrong. " + err.message)
  } finally {
    // regardless of outcome, re-enable button
    enableButton()
  }
}

const disableButton = () => {
  button.value = "Searching..."
  button.disabled = true
}

const enableButton = () => {
  button.value = "Get recommendations"
  button.disabled = false
}

const templateRaw = `
<p>If you like "{{track}}", you'll love:</p>
<ul>
  {{#each topThreeRecs}}
  <li>{{name}} - <a href="{{external_urls.spotify}}" target="_blank">Play</a></li>
  {{/each}}
</ul>
`
