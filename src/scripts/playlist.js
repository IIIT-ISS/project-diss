const playlist = document.getElementById("playlist");

const header = `
    <h1>Playlist</h1>
    <h2>Your Favorite Songs</h2>
`;

const empty_playlist = `
    <p class="playlist-entry playlist-entry-2">
        Songs in your playlist will appear here! 
        Head over to any album songs page to add your favorite songs.
    </p>
`;

function refresh_songs(id) {
    let url = "/playlist_api/full"
    if (id) {
        url += "?" + new URLSearchParams({ id: id, action: "del" });
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            display_records(data);
        });
}


function display_records(records) {
    playlist.innerHTML = header;
    if (records.length == 0) {
        playlist.innerHTML += empty_playlist;
        return;
    }

    i = 1;
    for (let record of records) {
        let album_link = `${record.artist_id}/albums/${record.album_id}`;
        playlist.innerHTML += `
        <div class="playlist-entry">
          <p>${i++}</p>
          <img src="/images/artist/${album_link}" class="playlist-img">
          <div class="track-and-author">
            <p>${record.song_name}</p>
            <p class="author">
              by <a class="playlist-link" href="/artists/${record.artist_id}">${record.artist_name}</a>
            </p>
          </div>
          <div class="album-name">
            <a class="playlist-link" href="/artists/${album_link}">${record.album_name}</a>
          </div>
          <div class="track-time">${record.song_time}</div>
          <button class="playlist-del" onclick="refresh_songs(${record.song_id})" title="Remove from Playlist"></button>
        </div>
      `;
    }
}

refresh_songs();