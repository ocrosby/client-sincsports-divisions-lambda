const SincSportsService = require('sincsports-service');

exports.handler = (event, context, callback) => {
    let season;
    let year;

    console.log(`Received event:\n${JSON.stringify(event)}`);

    season = event.pathParameters.season;
    year = event.pathParameters.year;

    console.log(`Retrieving SincSports divisions for the ${season} of ${year} ...`);

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

