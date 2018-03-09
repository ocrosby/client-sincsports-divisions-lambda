const SincSportsService = require('sincsports-service');

exports.handler = (event, context, callback) => {
    const season = event.season || event.body.season || 'fall';
    const year = event.year || event.body.year || '2017';

    console.log(`Received event:\n${event}`);

    try {
        SincSportsService.getDivisions(season, year)
            .then((divisions) => {
                callback(null, divisions);
            })
            .catch((err) => {
                callback(err);
            });

    } catch(err) {
        callback(err);
    }
};

