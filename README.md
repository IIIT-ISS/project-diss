[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uO3FBJhb)

# Project Meanius - by Team DISS

Web development team project for 2nd semester spring 2023 ISS course.

## Team members

- Ankith Pai (@ankithpai) (2022113012)
- Abhiram Tilak (@abhiramtilakiiit) (2022113011)

Group name (DISS)

## Documentation

This is the documentation for the project 'Meanius' - a music review website.

## General Usage

Follow the instructions below to get all the webpages up and running:

- Clone the repository for the webpage.
- Make sure all the folders including fonts and images are inside the cloned directory.
- Use a browser, preferably firefox or any browser using 'Gecko' browser engine.
- Make sure your browser supports 'websites displaying their own fonts'.
- Preferably the browser should have 'auto-hide' scrollbars option turned off for a better user experience.
- Now that your system is set up you should be able to view all the webpages as intended.

Instructions to navigate through the website:

- Launch the website server by running `app.py` with python. Connect to the address that the server binds to.
- From here use the navigation bar to navigate through the webpages.
- Once you are in the list of Artists page, you can click on an artists taking you to the artist-albums page.
- This page consists of a brief description of the artist and the list of albums and his/her/their/its top songs.
- Clicking on any of these albums in this page should take you to the album-songs page.
- This page consists of a brief description of the album and the list of all songs in the album.
- Each song in the list consists of details like name, song-length.
- There are other informative pages like the about page and the faq page.
- The search page allows you to search, filter and preview songs from iTunes.
- The spotlights page features a top artist, and also has a reviews submenu.
- The playlist page keeps track of all songs added by the user. 
- There is also a contribute page which takes you to our github.
- The footer in each of these pages also has the list of all webpages needed. which you can use for easy navigation.
- The footer also consists of credits which is a list of all resources used to make this website

## General Structure of the codebase:

```
.
├── app.py
├── ASSUMPTIONS.md
├── features
│   ├── artist-list.html
│   ├── home-test.html
│   └── sample-artist.html
├── fonts
│   └── [multiple font files here]
├── images
│   ├── artist
│   │   └── [artist id and name]
│   │       ├── albums
│   │       │   └── [image of an album with name and id]
│   │       ├── songs
│   │       │   └── [image of a song with name and id]
│   │       ├── [cover image]
│   │       └── [pfp image]
│   ├── spotlight
│   │   └── [extra images of spotlight artist here]
│   └── [images of general backgrounds, banners, textures nd logos used around the website]
├── README.md
├── src
│   ├── artists
│   │   ├── album-songs.html
│   │   ├── artist-albums.html
│   │   └── index.html
│   ├── css
│   │   └── [all css files here]
│   ├── scripts
│   │   └── [all js files here]
│   ├── about.html
│   ├── base.html
│   ├── faq.html
│   ├── index.html
│   ├── playlist.html
│   ├── search.html
│   └── spotlight.html
├── storage
│   └── [csv files to store static data used in the site]
└── webpage_content
    └── [text files that list content which was later integrated into the site]
```

## Assumptions page

The assumptions page consists of all the assumptions that were made deviating or not mentioned in the instructions.

## The `src` dir

- Contains the source code for the entire project
- At the root of this dir we have HTML pages for "Home", "About", "FAQ", "Playlist", "Search" and "Spotlight"

  #### Subdir `css`

  - All css code lives here, split into files by category

  #### Subdir `scripts`

  - All js code is here

  #### Subdir `artists`

  - Here are 3 template files, one for "artists" page, one for "artist albums" and the last for "album songs"

### The `images` dir

This consists of images for all the songs, albums and artists, and other backgrounds and logos used in the website:

- Each artist has a folder within the `artist` folder. There are images for all albums, top songs, and also a cover page and a pfp page.
- Other images include a few banners images we used, 3 home page images, 1 texture for headings
  background, a background for the whole webpage and finally the logos.

### The `fonts` dir

- This directory consists of fonts in `.ttf` (true type fonts) downloaded from websites like nerdfonts.com
  fonts.google.com and made sure the licenses are agreed upon.
- It also consists of `fonts.txt` which contains a guide of all the font placements.

### The `features` dir

- This is for testing purposes

### The `webpage_content` dir

- This consists of all the content filled in the webpage in text files.
- It has information like albums and artists descriptions (including year of release),
  all the song names for each album, their length etc.
