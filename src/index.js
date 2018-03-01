const http = require('http');
const bluebird = require('bluebird');
const cheerio = require('cheerio');
const querystring = require('querystring');

global.Promise = bluebird.Promise;

const CheerioOptions = {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: true
};

const BoysSelector = 'tr:nth-child(19) a , #ctl00_ContentPlaceHolder1_MTable tr+ tr td';
const GirlsSelector = '#ctl00_ContentPlaceHolder1_FTable tr+ tr td';


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
    path += `sYear=${year}`;

    return path;
};

exports.getHTML = (season, year) => {
    return new Promise((resolve, reject) => {
        let request;
        let options;
        let path;

        try {
            path = exports.generatePath(season, year);

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
                    let message;
                    let body = chunks.join();

                    if (response.statusCode === 200) {
                        resolve(body.toString());
                    } else {
                        message = `Invalid status code ${response.statusCode}!`;
                        reject(new Error(message));
                    }
                });
            });
        } catch(err) {
            reject(err);
        }
    });
};

exports.createDivision = (item, gender) => {
    let id;
    let url;
    let text;
    let anchor;

    text = item.text();
    anchor = item.children('a');

    if (anchor) {
        url = anchor.attr('href');

        if (url) {
            id = querystring.parse(url).div;
        } else {
            id = url = '?';
        }
    } else {
        id = url = '?';
    }

    return {
        name: text,
        url: url,
        id: id,
        gender: gender
    };
};

exports.handler = (event, context, callback) => {
    const season = event.season || 'fall';
    const year = event.year || '2017';

    exports.getHTML(season, year)
        .then((html) => {
            let i;
            let $;
            let promises;
            let boysPromises;
            let girlsPromises;

            console.log('Retrieved the html.');

            try {
                $ = cheerio.load(html, CheerioOptions);
            } catch (error) {
                callback(error);
            }

            promises = [];

            // Add the Boys Divisions
            boysPromises = $(BoysSelector).map(function () {
                return exports.createDivision($(this), 'male');
            }).toArray();

            girlsPromises = $(GirlsSelector).map(function () {
                return exports.createDivision($(this), 'female');
            }).toArray();

            for (i = 0; i < boysPromises.length; i++) {
                promises.push(boysPromises[i]);
            }

            for (i = 0; i < girlsPromises.length; i++) {
                promises.push(girlsPromises[i]);
            }

            Promise.all(promises)
                .then(function (data) {
                    callback(null, data);
                })
                .fail(function (error) {
                    callback(error);
                });

        })
        .catch((err) => {
            callback(err);
        });
};

