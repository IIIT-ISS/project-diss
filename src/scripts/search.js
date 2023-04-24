const form = document.getElementById("song-search");
const explicitness = document.getElementById("explicitness");
const duration = document.getElementById("duration");
const duration_m = document.getElementById("duration-m");
const duration_s = document.getElementById("duration-s");
const clear_filters = document.getElementById("clear-filters");

const songs_list = document.getElementById("songs-list");

var records = [];
var record_indices = "";

var explicit_filter = false;
var duration_time = -1;
var search_once = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let x = document.forms["song-search"]["search"].value;
  if (x == "") {
    alert("Song name must not be empty!");
    return false;
  }
  get_songs(x);
  search_once = true;
  display_records();
});

explicitness.addEventListener('change', explicitness_callback);
function explicitness_callback() {
  explicit_filter = explicitness.checked;
  display_records();
}

duration.addEventListener('change', duration_callback);
function duration_callback() {
  duration_m.disabled = duration_s.disabled = !duration.checked;
  duration_m.value = duration_s.value = "";
  duration_time = -1;
  display_records();
}

duration_m.addEventListener('change', duration_update);
duration_s.addEventListener('change', duration_update);
function duration_update() {
  duration_time = 0;
  if (duration_m.value != "") {
    duration_time += parseInt(duration_m.value) * 60;
  }
  if (duration_s.value != "") {
    duration_time += parseInt(duration_s.value);
  }

  if (duration_time < 0) {
    duration_callback();
  }
  else {
    duration_m.value = Math.floor(duration_time / 60);
    duration_s.value = duration_time % 60;
    display_records();
  }
}

clear_filters.addEventListener('click', clear_filters_callback);
function clear_filters_callback() {
  duration.checked = explicitness.checked = false;
  duration_callback();
  explicitness_callback();
  display_records();
}

function get_songs(term) {
  const url = "https://itunes.apple.com/search?" +
    new URLSearchParams({
      term: term,
      entity: "song",
      limit: 10,
    });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      records = data.results;
      record_indices = "";
      display_records();
    });
}

function display_records() {
  if (!search_once) {
    return;
  }

  let new_indices = "";
  for (let i = 0; i < records.length; i++) {
    /* Duration filter */
    if (duration_time > 0 && records[i].trackTimeMillis > (duration_time * 1000)) {
      continue;
    }

    /* Explicit filter */
    if (explicit_filter && records[i].trackExplicitness == "explicit") {
      continue;
    }

    new_indices += i;
  }

  /* If indices didn't change, don't refresh list */
  if (new_indices == record_indices && record_indices != "") {
    return;
  }

  record_indices = new_indices;
  i = 1;
  songs_list.innerHTML = "";
  for (let ind of record_indices) {
    const row = records[ind];
    let track_time_sec = Math.ceil(row.trackTimeMillis / 1000);
    let track_time_min = Math.floor(track_time_sec / 60);
    track_time_sec = ("0" + (track_time_sec % 60)).slice(-2);

    let explicit_str = "";
    if (row.trackExplicitness == "explicit") {
      explicit_str = "<p class=\"song-explicit\">[EXPLICIT]</p>";
    }

    songs_list.innerHTML += `
      <div class="song-entry">
        <p>${i++}</p>
        <img src="${row.artworkUrl60}">
        <div class="track-and-author">
          <a class="itunes-link" href="${row.trackViewUrl}">
            <p>${row.trackName}</p>
          </a>
          ${explicit_str}
          <p class="author">
            by <a class="itunes-link" href="${row.artistViewUrl}">${row.artistName}</a>
          </p>
        </div>
        <div class="album-name">${row.collectionName}</div>
        <audio controls><source src="${row.previewUrl}"></audio> 
        <div class="track-time">${track_time_min}:${track_time_sec}</div>
      </div>
    `;
  }

  if (songs_list.innerHTML == "") {
    songs_list.innerHTML = "<p class=\"song-entry\" style=\"padding-left: 35%\">Couldn't find any matching songs!</p>";
  }
}

clear_filters_callback();