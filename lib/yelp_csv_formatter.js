var consoleWriter = require('./consoleWriter')

exports.CsvFormatter = function(options) {
    
    var writer = options.writer || consoleWriter.ConsoleWriter()

    return {
        
        format: function(results) {
            
            var csv = ''
            
            var headerRow = [
                'id',
                'name',
                'url',
                'phone',
                'latitude',
                'longitude',
                'address',
                'city',
                'postal_code'
            ]
            
            csv += headerRow.join(',') + "\n"
            
            for (index in results) {
                var result = results[index]
                
                if (result) {
                    
                    var streetAddress = ''
                    if (result.location
                        && result.location.address
                        && (result.location.address.length > 0)) {
                        streetAddress = result.location.address[result.location.address.length - 1]
                    }
                    
                    var latitude, longitude
                    if (result.location && result.location.coordinate) {
                        latitude = result.location.coordinate.latitude
                        longitude = result.location.coordinate.longitude
                    }
                    
                    var row = [
                        result.id ? result.id : '',
                        result.name ? result.name : '',
                        result.url ? result.url : '',
                        result.phone ? result.phone : '',
                        latitude,
                        longitude,
                        streetAddress,
                        result.location.city ? result.location.city : '',
                        result.location.postal_code ? result.location.postal_code : ''
                    ]
                    
                    csv += row.join(',') + "\n"
                    
                }
                
            }
            
            writer.write(csv)
            
        }
        
    }
    
}
