const http = require('http');

exports.handler = (event, context, callback) => {
    let tid;
    let sub;
    let request;
    let options;

    if (!event.season) {
        event.season = 'fall';
    }

    if (!event.year) {
        event.year = '2017';
    }

    if (event.season === 'fall') {
        tid = 'NCFL';
        sub = '3';
    } else {
        tid = 'NCCSL';
        sub = '2';
    }

    options = {
        method: 'GET',
        hostname: 'soccer.sincsports.com',
        port: null,
        path: `/TTSchedules.aspx?tid=${tid}&tab=3&sub=${sub}&sTid=${tid}&sYear=${event.year}`,
        headers: {
            'cache-control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X)'
        }
    };

    request = http.request(options, (response) => {
        let chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            let html;
            let body = Buffer.concat(chunks);

            if (response.statusCode === 200) {
                html = body.toString();

                callback(null, body.toString());
            } else {
                callback(new Error('Invalid status code ' + response.statusCode + '!'));
            }
        });
    });
};