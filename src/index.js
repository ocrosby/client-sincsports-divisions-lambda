const http = require('http');

exports.getTid = (season) => {
    if (!season) {
        return 'NCFL';
    }

    return season === 'fall' ? 'NCFL' : 'NCCSL';
};

exports.getSub = (season) => {
    if (!season) {
        return '3';
    }

    return season === 'fall' ? '3' : '2';
};

exports.generatePath = (season, year) => {
    const tid = exports.getTid(season);
    const sub = exports.getSub(season);

    let path;

    path = '/TTSchedules.aspx?';
    path += `tid=${tid}&`;
    path += 'tab=3&';
    path += `sub=${sub}&`;
    path += `sTid=${tid}&`;
    path += `sYear=${event.year}`;

    return path;
};

exports.handler = (event, context, callback) => {
    let request;
    let options;

    const season = event.season || 'fall';
    const year = event.year || '2017';
    const path = exports.generatePath(season, year);

    options = {
        method: 'GET',
        hostname: 'soccer.sincsports.com',
        port: null,
        path: path,
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
            let message;
            let body = chunks.join();

            if (response.statusCode === 200) {
                html = body.toString();

                callback(null, body.toString());
            } else {
                message = `Invalid status code ${response.statusCode}!`;
                callback(new Error(message));
            }
        });
    });
};

