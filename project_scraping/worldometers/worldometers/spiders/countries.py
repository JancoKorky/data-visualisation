import scrapy

class CountriesSpider(scrapy.Spider):
    name = 'countries'
    allowed_domains = ['www.worldometers.info']
    start_urls = [
        'https://www.worldometers.info/world-population/population-by-country/']

    def parse(self, response):
        countries = response.xpath("//td/a")
        for country in countries:
            name = country.xpath(".//text()").get()
            link = country.xpath(".//@href").get()

            yield response.follow(url=link, callback=self.parse_country, meta={'country_name': name})

    def parse_country(self, response):
        list_of_years = []
        name = response.request.meta['country_name']
        rows = response.xpath(
            "(//table[@class='table table-striped table-bordered table-hover table-condensed table-list'])[1]/tbody/tr")
        for row in rows:
            dict_year = {}
            dict_year["year"] = row.xpath(".//td[1]/text()").get()
            count = row.xpath(".//td[2]/strong/text()").get().replace(',',"")
            dict_year["population"] = int(count)
            list_of_years.append(dict_year)

        yield {
            'country_name': name, 'country_data': list_of_years
        }
