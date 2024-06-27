// script.js

const axios = window.axios;
const handlebars = window.Handlebars;
const output = document.getElementById("recommendation-output");
const moreButton = document.getElementById("more-recommendations");

let currentPage = 0;
let track = "";
let artist = "";

const showToast = (message, type) => {
  if (document.querySelectorAll(".toastify-error").length > 0) {
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
    className: `toastify toastify-${type}`,
    style: {
      border: type === "error" ? "2px solid darkred" : "2px solid darkblue",
      borderRadius: "10px",
      padding: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  }).showToast();
};

const submitForm = async (event) => {
  event.preventDefault();
  const { elements } = event.target;
  track = elements.track.value.trim();
  artist = elements.artist.value.trim();
  currentPage = 0;
  output.innerHTML = "";
  moreButton.style.display = "none";
  await fetchRecommendations();
};

const fetchRecommendations = async () => {
  let result;
  try {
    result = await axios.post("/recommendations", {
      track,
      artist,
      page: currentPage,
    });
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
    moreButton.style.display = "none";
    return;
  }

  currentPage += 1;

  const templateRaw = `
    {{#if track}}
      {{#if track.length}}
        <h6>If you like "{{track}}", you'll love:</h6>
      {{else}}
        <h6>Here are some random recommendations:</h6>
      {{/if}}
    {{else}}
      <h6>Here are some random recommendations:</h6>
    {{/if}}
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

  const template = handlebars.compile(templateRaw);
  const recommendationsHtml = template({ track, recommendations });
  output.innerHTML += recommendationsHtml;

  moreButton.style.display = "block";
};

const loadMoreRecommendations = async () => {
  await fetchRecommendations();
};

document.getElementById("search-form").addEventListener("submit", submitForm);
moreButton.addEventListener("click", loadMoreRecommendations);

document.addEventListener('DOMContentLoaded', () => {
  const trackInput = document.getElementById('track');
  const artistInput = document.getElementById('artist');
  const submitButton = document.getElementById('submitButton');

  function updateButton() {
    if (trackInput.value.trim() === '' && artistInput.value.trim() === '') {
      submitButton.value = "Get Random Recommendation";
    } else {
      submitButton.value = "Get Recommendations";
    }
  }

  trackInput.addEventListener('input', updateButton);
  artistInput.addEventListener('input', updateButton);

  updateButton();
});
