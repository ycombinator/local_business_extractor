var yelp = require('yelp'),
    async = require('async'),
    identityFormatter = require('./identity_formatter')

exports.YelpFetcher = function(options) {

    var client = yelp.createClient({
        consumer_key: options.apiConsumerKey,
        consumer_secret: options.apiConsumerSecret,
        token: options.apiToken,
        token_secret: options.apiTokenSecret
    })

    var formatter = options.formatter || identityFormatter.IdentityFormatter()

    var results = []

    var search = function(searchParams, callback) {

        var limit = searchParams.limit || 20
        var start = searchParams.offset || 0
        var end = start + limit

        console.log("YelpFetcher.search: Requesting business from " + start + " to " + end)

        client.search(
            {
                location: searchParams.location,
                category_filter: searchParams.category,
                radius_filter: searchParams.radius || 40000,
                limit: searchParams.limit || 20,
                offset: searchParams.offset || 0
            },
            function(err, data) {
                console.log("YelpFetcher.search: Search for businesses from " + start + " to " + end + " complete")
                callback(err, data)
            }
        )

    }
    
    return {
        
        fetch: function(searchParams) {

            // Fetch first page of results to get total number of results
            searchParams.offset = 0
            searchParams.limit = searchParams.limit || 20

            search(searchParams, function(err, data) {

                if (err) {
                    console.error("YelpFetcher.fetch error = ")
                    console.error(err)
                    throw err
                }

                results = results.concat(data.businesses)
                console.log("Total businesses = " + data.total)

                // Fetch remaining pages of results, in parallel
                var numPagesRemaining = Math.floor(data.total / searchParams.limit)

                var offsets = []
                for (var page = 1; page < numPagesRemaining; ++page) {
                    var offset = page * searchParams.limit
                    if (offset < 1000)
                        offsets.push(page * searchParams.limit)
                }

                async.map(
                    offsets,
                    function(offset, asyncCallback) {
                        searchParams.offset = offset
                        search(searchParams, function(err, data) {
                            
                            if (err) {
                                console.error('YelpFetcher.fetch error = ')
                                console.error(err)
                                throw err
                            }

                            results = results.concat(data.businesses)
                            asyncCallback()
                        })
                    },
                    function() {
                        console.log("YelpFetcher.fetch: Search complete!")
                        formatter.format(results)
                    }
                )
                
            })
        
        }

    }

}
