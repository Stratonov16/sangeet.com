const axios = window.axios;
const handlebars = window.Handlebars;
const output = document.getElementById("recommendation-output");

const submitForm = async (event) => {
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
    if (err.response && err.response.data && err.response.data.message) {
      errMsg = err.response.data.message;
    }
    Toastify({
      text: errMsg,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#ff0000",
      stopOnFocus: true,
    }).showToast();
    return;
  }

  const recommendations = result.data.tracks;
  if (!recommendations.length) {
    Toastify({
      text: "No recommendations found.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#ff0000",
      stopOnFocus: true,
    }).showToast();
    return;
  }

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
    <li>
      <h6>
        <a href="{{external_urls.spotify}}" target="_blank">
          <img src="{{album.images.2.url}}" width="20px">
          {{name}}
        </a>
        <audio controls src="{{preview_url}}"></audio>
      </h6>
    </li>
    {{/each}}
  </ul>
`;
