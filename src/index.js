const SincSportsService = require('./SincSportsService.js');

exports.handler = (event, context, callback) => {
    const season = event.season || 'fall';
    const year = event.year || '2017';

    let service;

    try {
        service = new SincSportsService();

        service.getDivisions(season, year)
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

