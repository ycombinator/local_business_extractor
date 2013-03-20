var assert = require('assert'),
    identityFormatter = require(__dirname + '/../../lib/identity_formatter')

describe('IdentityFormatter', function() {

  describe('#format()', function() {

    it('should write a string', function() {

      var writer = function() {
        var buffer = ''
        return {
          write: function(data) {
            buffer += data
          },
          getBuffer: function() {
            return buffer
          }
        }
      }()
      
      var formatter = identityFormatter.IdentityFormatter({
        writer: writer
      })

      var fixture = 'foo'
      formatter.format(fixture)
      assert.equal(fixture, writer.getBuffer())
    })

    it('should write an object', function() {

      var writer = function() {
        var buffer = ''
        return {
          write: function(data) {
            buffer += data
          },
          getBuffer: function() {
            return buffer
          }
        }
      }()
      
      var formatter = identityFormatter.IdentityFormatter({
        writer: writer
      })

      var fixture = { foo: 'bar' }
      formatter.format(fixture)
      assert.equal(fixture, writer.getBuffer())
    })

  })
})

