var fs = require('fs')

exports.FileWriter = function(options) {
    
    var filename = options.filename
    
    return {
        
        write: function(data) {
            fs.writeFile(filename, data, function(err) {
                
                if (err) {
                    console.error('FileWriter.write error = ')
                    console.error(err)
                    throw err
                }
                
                console.log('FileWriter.write: File ' + filename + ' written.')
            })
        }
        
    }
    
}
