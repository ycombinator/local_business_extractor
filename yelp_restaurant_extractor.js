var yelpFetcher = require('./lib/yelp_fetcher'),
    yelpCsvFormatter = require('./lib/yelp_csv_formatter'),
    fileWriter = require('./lib/file_writer')

var writer = fileWriter.FileWriter({
    filename: __dirname + '/var/yelp.csv'
})
    
var formatter = yelpCsvFormatter.YelpCsvFormatter({
    writer: writer
})
        
var fetcher = yelpFetcher.YelpFetcher({
    apiConsumerKey: process.env.YELP_API_CONSUMER_KEY,
    apiConsumerSecret: process.env.YELP_API_CONSUMER_SECRET,
    apiToken: process.env.YELP_API_TOKEN,
    apiTokenSecret: process.env.YELP_API_TOKEN_SECRET,
    formatter: formatter
})

fetcher.fetch({
    location: 'San Francisco, CA',
    category: 'restaurants'
})
