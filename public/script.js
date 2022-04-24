// client-side js, loaded by index.html. Run when web page is loaded

// // any console.log in this file will appear the browser console
// console.log("Hello from script.js!")
const axios = window.axios;
const handlebars = window.Handlebars;
const output = document.getElementById("recommendation-output");

const submitForm = async (event) => {
  //to handle network issue while submitting use async
  event.preventDefault();
  const { elements } = event.target;
  const track = elements.track.value;
  const artist = elements.artist.value;
  console.log({ artist, track });
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
  const topRecs = recommendations.slice(0, 20);

  console.log(topRecs);

  const template = handlebars.compile(templateRaw);
  const recommendationsHtml = template({ track, topRecs });
  output.innerHTML = recommendationsHtml;
};

const templateRaw = `
<p>Discover new tunes!<p>
<h6>If you like "{{track}}", you'll love:</h6>
<ul>
  {{#each topRecs}}
  <li><h6> <a href="{{external_urls.spotify}}">
  <img src ="https://cdn.glitch.global/885771ac-3cfa-4c5a-bde7-235096795ebd/pixlr-bg-result.png?v=1650800025230" width ="20px">
  {{name}}</a></h6></li>
  {{/each}}
</ul>
`;
