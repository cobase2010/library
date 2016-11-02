var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({
    explicitArray: false
});

//key: 96e16qK9vIBM8lY0n0S5aw
//secret: XnK7fESy66B1MXlz1bas52HgnaSDPHP3K8ahmSLhL8

var goodreadService = function () {
    var getBookById = function (id, cb) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id +'?format=xml&key=96e16qK9vIBM8lY0n0S5aw'
        };
        var callback = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                console.log(str);
                parser.parseString(str, function (err, result) {
                    cb(null, result.GoodreadsResponse.book);

                });
            });
        };
        http.request(options, callback).end();

    };

    return {
        getBookById: getBookById,
    };
};

module.exports = goodreadService;