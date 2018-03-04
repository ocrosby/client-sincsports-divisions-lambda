const index = require('./src/index.js');

const event = { season: 'spring', year: 2018 };
const context = {};

index.handler(event, context, (err, divisions) => {
    let i;
    let length;
    let currentDivision;

    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        for (i = 0, length = divisions.length ; i < length ; i++) {
            currentDivision = divisions[i];
            console.log(JSON.stringify(currentDivision));
        }

        console.log(`There are ${length} divisions.`);
    }

    process.exit(0);
});
