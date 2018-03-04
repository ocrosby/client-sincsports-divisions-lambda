const SincSportsService = require('sincsports-service');

exports.handler = (event, context, callback) => {
    const season = event.season || 'fall';
    const year = event.year || '2017';

    let service;

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

