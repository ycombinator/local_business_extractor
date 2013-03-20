var consoleWriter = require('./console_writer')

exports.IdentityFormatter = function(options) {

    var writer = options.writer || consoleWriter.ConsoleWriter()

    return {

        format: function(data) {
            writer.write(data)
        }

    }

}
