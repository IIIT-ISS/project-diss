import scrapy
import os
import csv
import shutil
from scrapy.crawler import CrawlerProcess


class SongSpider(scrapy.Spider):
    name = "song_spider"
    
    # The starting URL(s) for the spider
    def start_requests(self):
        # Iterate through the ../artists folder
        artists_dir = "../artists"
        for artist in os.listdir(artists_dir):
            artist_dir = os.path.join(artists_dir, artist)
            if not os.path.isdir(artist_dir):
                continue

            # Iterate through the album HTML files for this artist
            for album_file in os.listdir(artist_dir):
                if album_file.endswith(".html"):
                    if album_file == "index.html":
                        continue;
                    album_path = os.path.join(artist_dir, album_file)
                    album_num = int(album_file[7]) 
                    url = "file://" + os.path.abspath(album_path)
                    url = url.replace('\\', '/')
                    yield scrapy.Request(url=url, callback=self.parse_album, meta={"artist": artist, "album": album_num})
                    
    def parse_album(self, response):
        artist = response.meta["artist"]
        album = response.meta["album"]

        # Extract song names and times
        songs = response.css("div.song")
        for song in songs:
            song_name = song.css("p:nth-child(1)::text").get().strip().replace('"','').replace(","," ")
            song_time = song.css("p:nth-child(2)::text").get().strip()

            # Write song data to CSV file
            with open("../../storage/songs.csv", "a", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow([artist, album, song_name, song_time])




if __name__ == "__main__":
    # Set up the Scrapy spider and process
    process = CrawlerProcess(settings={
        "FEED_FORMAT": "csv",
        "FEED_URI": "../../storage/songs.csv"
    })
    process.crawl(SongSpider)
    process.start()

    # Sort CSV file by artist and album
    with open("../../storage/songs.csv", "r", newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        sorted_data = sorted(reader, key=lambda x: (x[0], x[1]))

    # Write sorted CSV data to temporary file
    with open("../../storage/songs_sorted.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(sorted_data)

    # Replace original CSV file with sorted data
    shutil.move("../../storage/songs_sorted.csv", "../../storage/songs.csv")