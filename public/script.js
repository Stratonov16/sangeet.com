const axios = window.axios;
const handlebars = window.Handlebars;
const output = document.getElementById("recommendation-output");
const moreButton = document.getElementById("more-recommendations");

let currentPage = 0;
let track = '';
let artist = '';

const showToast = (message, type) => {
  // Check if an error toast is already displayed
  if (document.querySelectorAll('.toastify-error').length > 0) {
    return;
  }

  // Show the toast with custom color and shape
  Toastify({
    text: message,
    duration: 3000,
    backgroundColor: type === "error" ? "red" : "blue",
    close: true,
    gravity: "top",
    position: "right",
    // border-radius: 
    className: `toastify toastify-${type}`,
  }).showToast();
};

const submitForm = async (event) => {
  event.preventDefault();
  const { elements } = event.target;
  track = elements.track.value;
  artist = elements.artist.value;
  currentPage = 0;
  output.innerHTML = ''; // Clear previous recommendations
  moreButton.style.display = 'none'; // Hide the button before fetching new recommendations

  await fetchRecommendations();
};

const fetchRecommendations = async () => {
  let result;
  try {
    result = await axios.post("/recommendations", { track, artist, page: currentPage });
  } catch (err) {
    let errMsg = "Something went wrong";
    if (err.response && err.response.data && err.response.data.message) {
      errMsg = err.response.data.message;
    }
    showToast(errMsg, "error");
    return;
  }

  const recommendations = result.data.tracks;
  if (!recommendations.length) {
    showToast("No recommendations found.", "warning");
    moreButton.style.display = 'none';
    return;
  }

  currentPage += 1;

  const template = handlebars.compile(templateRaw);
  const recommendationsHtml = template({ track, recommendations });
  output.innerHTML += recommendationsHtml;

  // Show the "More Recommendations" button if there are recommendations
  moreButton.style.display = 'block';
};

const loadMoreRecommendations = async () => {
  await fetchRecommendations();
};

const templateRaw = `
<h6>If you like "{{track}}", you'll love:</h6>
<ul>
  {{#each recommendations}}
  <li>
    <h6>
      <a href="{{external_urls.spotify}}">
        <img src="{{album.images.2.url}}" width="64px">
        {{name}}
      </a>
      by {{#each artists}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}
      <br>
      <audio controls>
        <source src="{{preview_url}}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </h6>
  </li>
  {{/each}}
</ul>
`;

document.getElementById('search-form').addEventListener('submit', submitForm);
moreButton.addEventListener('click', loadMoreRecommendations);
