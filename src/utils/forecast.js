const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/76d2898720cc87af369dde768ea1e074/' +
    longitude +
    ',' +
    latitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        summary: body.hourly.summary,
        temp: body.currently.temperature,
        precip: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
