// client-side js, loaded by index.html. Run when web page is loaded

// // any console.log in this file will appear the browser console
// console.log("Hello from script.js!")
const axios = window.axios;
const handlebars = window.Handlebars;
const output = document.getElementById("recommendation-output");

const submitForm = async (event)=>{ //to handle network issue while submitting use async
  event.preventDefault();
  const { elements} = event.target
  const track = elements.track.value;
  const artist = elements.artist.value;
  console.log({artist, track});
  let result;
  try {
    result = await axios.post("/recommendations", { track, artist });
  } catch (err) {
    let errMsg = "Something went wrong";
    if (err.response.data.message) {
      errMsg = err.response.data.message;
    }
    return alert(errMsg);
  }

  const recommendations = result.data.tracks;
  const topThreeRecs = recommendations.slice(0, 3);

  console.log(topThreeRecs);

  const template = handlebars.compile(templateRaw);
  const recommendationsHtml = template({ track, topThreeRecs });
  output.innerHTML = recommendationsHtml;
};

const templateRaw = `
<h3>Discover new tunes!</h3>
<p>If you like "{{track}}", you'll love:</p>
<ul>
  {{#each topThreeRecs}}
  <li>{{name}} - <a href="{{external_urls.spotify}}">Play</a></li>
  {{/each}}
</ul>
`;
