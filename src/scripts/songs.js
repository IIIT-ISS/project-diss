const buttons = document.querySelectorAll('button')
buttons.forEach(btn => {
    btn.addEventListener('click', event => {
        refresh_songs(btn);
    });
});

function refresh_songs(button) {
    let url = "/playlist_api/minimal"
    if (button) {
        let action_val = null;
        if (button.className == "playlist-on") {
            action_val = "del"
        }
        else if (button.className == "playlist-off") {
            action_val = "add"
        }
        if (action_val) {
            url += "?" + new URLSearchParams({ id: button.id, action: action_val });
        }
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let button of buttons) {
                if (data.includes(parseInt(button.id))) {
                    button.title = "Already in Playlist! Click to remove";
                    button.className = "playlist-on";
                }
                else {
                    button.title = "Add to Playlist";
                    button.className = "playlist-off";
                }
            }
        });
}

refresh_songs();
