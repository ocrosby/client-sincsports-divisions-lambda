const SincSportsService = require('sincsports-service');

exports.handler = (event, context, callback) => {
    const season = event.season || event.body.season || 'fall';
    const year = event.year || event.body.year || '2017';

    console.log(`Received event:\n${event}`);

    try {
        SincSportsService.getDivisions(season, year)
            .then((divisions) => {
                callback(null, {
                    "isBase64Encoded": false,
                    "statusCode": 200,
                    "headers": {},
                    "body": JSON.stringify(divisions)
                });
            })
            .catch((err) => {
                callback(null, {
                    "isBase64Encoded": false,
                    "statusCode": 500,
                    "headers": {},
                    "body": JSON.stringify({ message: err.mesage })
                });
            });

    } catch(err) {
        callback(null, {
            "isBase64Encoded": false,
            "statusCode": 500,
            "headers": {},
            "body": JSON.stringify({ message: err.mesage })
        });
    }
};

