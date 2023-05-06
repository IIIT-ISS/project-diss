from __future__ import annotations

import csv
import sqlite3
from pathlib import Path

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
)

BASE = Path(".")
SRC = BASE / "src"

IMAGES = BASE / "images"
ARTIST_IMAGES = IMAGES / "artist"
STORAGE = BASE / "storage"

DB_FILE = STORAGE / "diss.db"


def populate_table_from_csv(name: str):
    file = STORAGE / f"{name}.csv"
    if not file.exists():
        return

    head = ""
    data: list[list[str]] = []
    col_width = 0
    with open(file) as f:
        for row in csv.reader(f):
            if not head:
                head = ", ".join(row)
                col_width = len(row)
            else:
                if len(row) != col_width:
                    raise RuntimeError(f"Row '{row}' has incorrect width")

                data.append(row)

    cur.executemany(
        f"INSERT INTO {name}({head}) VALUES({','.join(['?'] * col_width)})", data
    )


def reset_table(name: str, *params: tuple[str, str]):
    cur.execute(f"DROP TABLE IF EXISTS {name}")
    cur.execute(f"CREATE TABLE {name}({','.join(' '.join(i) for i in params)})")
    populate_table_from_csv(name)


def direct_load_table(name: str):
    cur.execute(f"SELECT * FROM {name}")
    template_context[name] = [row for row in cur.fetchall()]


def get_artist_album_from_song(song_id: int, cur_obj: sqlite3.Cursor):
    cur_obj.execute(f"SELECT artist_id, album_id FROM songs WHERE song_id = {song_id}")
    return cur_obj.fetchone()


do_reset = not DB_FILE.exists()
con = sqlite3.connect(DB_FILE)
cur = con.cursor()

if do_reset:
    reset_table(
        "artist",
        ("artist_id", "INTEGER"),
        ("artist_name", "TINYTEXT"),
        ("artist_description", "TEXT"),
    )
    reset_table(
        "albums",
        ("album_id", "INTEGER"),
        ("artist_id", "INTEGER"),
        ("album_name", "TINYTEXT"),
        ("album_description", "TEXT"),
        ("album_year", "INTEGER"),
    )
    reset_table(
        "songs",
        ("song_id", "INTEGER PRIMARY KEY AUTOINCREMENT"),
        ("album_id", "INTEGER"),
        ("artist_id", "INTEGER"),
        ("song_name", "TINYTEXT"),
        ("song_time", "TINYTEXT"),
    )
    reset_table(
        "top",
        ("entry_type", "TINYTEXT"),
        ("entry_id1", "INTEGER"),
        ("entry_id2", "INTEGER"),
    )
    reset_table(
        "credits",
        ("name", "TINYTEXT"),
        ("url", "TINYTEXT"),
        ("alt_name", "TINYTEXT"),
        ("alt_url", "TINYTEXT"),
    )
    reset_table(
        "faq",
        ("question", "TEXT"),
        ("answer", "TEXT"),
    )
    reset_table("playlist", ("song_id", "INTEGER"))
    con.commit()

artists = {}

cur.execute("SELECT artist_id, artist_name, artist_description FROM artist")
for artist_id, artist_name, artist_description in cur.fetchall():
    cur.execute(
        "SELECT album_id, album_name, album_description, album_year FROM albums "
        f"WHERE artist_id = {artist_id}"
    )
    albums = {}
    has_top = False
    for album_id, album_name, album_description, album_year in cur.fetchall():
        songs = {}
        cur.execute(
            "SELECT song_id, song_name, song_time FROM songs "
            f"WHERE artist_id = {artist_id} AND album_id = {album_id}"
        )
        for song_id, song_name, song_time in cur.fetchall():
            has_img = any(ARTIST_IMAGES.glob(f"{artist_id}_*/songs/{song_id}_*"))
            if has_img:
                has_top = True

            songs[song_id] = {
                "name": song_name,
                "time": song_time,
                "has_img": has_img,
            }

        albums[album_id] = {
            "name": album_name,
            "description": album_description.split("\n"),
            "year": album_year,
            "songs": songs,
        }

    artists[artist_id] = {
        "name": artist_name,
        "description": artist_description.split("\n"),
        "albums": albums,
        "has_top": has_top,
    }

template_context = {
    "top": {
        "artists": [],
        "albums": [],
        "songs": [],
    },
    "artists": artists,
}

for i in ("faq", "credits"):
    direct_load_table(i)

cur.execute("SELECT * FROM top")
for entry_type, id1, id2 in cur.fetchall():
    if entry_type == "artist":
        template_context["top"]["artists"].append(id1)

    elif entry_type == "album":
        template_context["top"]["albums"].append((id1, id2))

    else:
        artist_id, album_id = get_artist_album_from_song(id1, cur)
        template_context["top"]["songs"].append((artist_id, album_id, id1))

con.close()

app = Flask(__name__, template_folder="src")


@app.route("/images/<path>")
def send_base_images(path: str):
    return send_from_directory("images", path)


@app.route("/images/spotlight/<path>")
def send_spotlight_images(path: str):
    return send_from_directory("images/spotlight", path)


@app.route("/images/artist/<int:artist_id>/<path>")
def send_artist_images(artist_id: int, path: str):
    for p in ARTIST_IMAGES.glob(f"{artist_id}_*/{path}.*"):
        # return first match
        return send_from_directory("images", p.relative_to(IMAGES))

    abort(404)


@app.route("/images/artist/<int:artist_id>/<path>/<int:sub_id>")
def send_artist_album_song_images(artist_id: int, path: str, sub_id: int):
    for p in ARTIST_IMAGES.glob(f"{artist_id}_*/{path}/{sub_id}_*"):
        # return first match
        return send_from_directory("images", p.relative_to(IMAGES))

    abort(404)


@app.route("/favicon.ico")
def send_favicon():
    return send_from_directory(".", "favicon.ico")


@app.route("/fonts/<path:path>")
def send_fonts(path: str):
    return send_from_directory("fonts", path)


@app.route("/css/<name>.css")
def send_css(name: str):
    return send_from_directory("src/css", name + ".css")


@app.route("/scripts/<name>.js")
def send_js(name: str):
    return send_from_directory("src/scripts", name + ".js")


@app.route("/")
def send_index():
    return redirect("/index.html")


@app.route("/artists")
@app.route("/<name>.html")
def handle_src(name: str = "artists/index"):
    return render_template(name + ".html", **template_context)


@app.route("/artists/<int:artist_id>")
def handle_artist_albums(artist_id: int):
    if artist_id not in artists:
        abort(404)

    return render_template(
        "artists/artist-albums.html",
        **template_context,
        **artists[artist_id],
        artist_id=artist_id,
    )


@app.route("/artists/<int:artist_id>/albums/<int:album_id>")
def handle_albums_songs(artist_id: int, album_id: int):
    if artist_id not in artists:
        abort(404)

    albums = artists[artist_id]["albums"]
    if album_id not in albums:
        abort(404)

    return render_template(
        "artists/album-songs.html",
        **template_context,
        **albums[album_id],
        artist_id=artist_id,
        album_id=album_id,
    )


@app.route("/playlist_api/<api_type>")
def playlist_api_minimal(api_type: str):
    if api_type == "minimal":
        is_minimal = True
    elif api_type == "full":
        is_minimal = False
    else:
        abort(404)

    con = sqlite3.connect(DB_FILE)
    try:
        cur = con.cursor()
        cur.execute("SELECT * FROM playlist")
        playlist_songs = [int(i[0]) for i in cur.fetchall()]

        song_id = request.args.get("id", type=int)
        action = request.args.get("action")
        if action == "add" and song_id and song_id not in playlist_songs:
            cur.execute(f"INSERT INTO playlist VALUES ({song_id})")
            playlist_songs.append(song_id)
            con.commit()

        if action == "del" and song_id in playlist_songs:
            cur.execute(f"DELETE FROM playlist WHERE song_id = {song_id}")
            playlist_songs.remove(song_id)
            con.commit()

        if is_minimal:
            return playlist_songs

        ret = []
        for song_id in playlist_songs:
            artist_id, album_id = get_artist_album_from_song(song_id, cur)
            artist = artists[artist_id]
            album = artist["albums"][album_id]
            song = album["songs"][song_id]
            ret.append(
                {
                    "artist_id": artist_id,
                    "album_id": album_id,
                    "song_id": song_id,
                    "song_name": song["name"],
                    "song_time": song["time"],
                    "artist_name": artist["name"],
                    "album_name": album["name"],
                }
            )
        return ret

    finally:
        con.close()


if __name__ == "__main__":
    app.run()
