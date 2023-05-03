import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.exporters import CsvItemExporter

class AlbumItem(scrapy.Item):
    album_name = scrapy.Field()

class AlbumSpider(scrapy.Spider):
    name = "album"
    start_urls = [
        'file:///B:/git/project-diss/src/artists/index.html'
    ]

    def parse(self, response):
        for album in response.xpath('//big/text()').getall():
            album_item = AlbumItem()
            album_item['album_name'] = album.strip()
            yield album_item

process = CrawlerProcess(settings={
    'FEED_URI': 'albums.csv',
    'FEED_FORMAT': 'csv',
    'FEED_EXPORT_FIELDS': ['album_name'],
})


if __name__ == '__main__':
    process = CrawlerProcess(settings={
    'FEED_EXPORTERS': {'csv': 'scrapy.exporters.CsvItemExporter'},
    'FEED_FORMAT': 'csv',
    'FEED_URI': 'albums.csv'
    })
    process.crawl(AlbumSpider)
    process.start()
