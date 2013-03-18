exports.IdentityFormatter = function(options) {

    var writer = options.writer || exports.ConsoleWriter()

    return {

        format: function(data) {
            writer.write(data)
        }

    }

}
