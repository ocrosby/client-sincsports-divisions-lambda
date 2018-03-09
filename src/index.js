const SincSportsService = require('sincsports-service');
const Helpers = require('lambda-helpers');

exports.handler = (event, context, callback) => {
    let season;
    let year;
    let responder = Helpers.GatewayResponder.Create(callback);

    console.log(`Received event:\n${JSON.stringify(event)}`);

    season = event.pathParameters.season;
    year = event.pathParameters.year;

    console.log(`Retrieving SincSports divisions for the ${season} of ${year} ...`);

    try {
        SincSportsService.getDivisions(season, year)
            .then((divisions) => {
                responder.success(divisions);
            })
            .catch((err) => {
                responder.error(err);
            });

    } catch(err) {
        responder.error(err);
    }
};

