const SincSportsService = require('sincsports-service');
const Helpers = require('lambda-helpers');

exports.handler = (event, context, callback) => {
    const responder = Helpers.GatewayResponder.Create(callback);

    let season;
    let year;
    let gender;

    try {
        console.log(`Received event: ${JSON.stringify(event, null, 2)}`);
        console.log(`context: ${JSON.stringify(context, null, 2)}`);
        console.log(`pathParameters: ${JSON.stringify(event.pathParameters, null, 2)}`);

        season = event.pathParameters.season;
        year = event.pathParameters.year;
        gender = event.pathParameters.year;

        console.log(`season=${season}`);
        console.log(`year=${year}`);

        SincSportsService.getDivisions(season, year, gender)
            .then((divisions) => {
                console.log(`divisions: ${JSON.stringify(divisions, null, 2)}`);

                responder.success(divisions);
            })
            .catch((err) => {
                console.error(err);

                responder.error(err);
            });

    } catch(err) {
        console.error(err);

        responder.error(err);
    }
};

