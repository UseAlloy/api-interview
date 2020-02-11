require('dotenv').config();
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const assert = require('assert');

describe('Unit tests', () => {
  describe('weather-api', () => {
    const weatherCurrently = { summary: 'Mostly Cloudy' };
    const overrides = {
      'request-promise': () => Promise.resolve({ currently: weatherCurrently }),
    };

    const apiKey = process.env.DARKSKY_API_KEY;
    const lat = '43.2066';
    const lon = '-94.8728';
    const time = 1581360637;

    let spy;
    let weatherApi;
    beforeEach(() => {
      spy = sinon.spy(overrides, 'request-promise');
      weatherApi = rewiremock.proxy(() => require('../weather-api'), overrides);
    });
    afterEach(() => overrides['request-promise'].restore());

    it('`getWeatherAtTime` should invoke request with the correct parameters', async () => {
      await weatherApi.getWeatherAtTime(lat, lon, time);
      assert.deepEqual(spy.getCall(0).args, [
        `https://api.darksky.net/forecast/${apiKey}/${lat},${lon},${time}`,
        { json: true },
      ]);
    });

    it('`getWeatherAtTime` should return a promise that resolves to the request response', async () => {
      const result = await weatherApi.getWeatherAtTime(lat, lon, time);
      assert.deepEqual(result, await overrides['request-promise']());
    });

    it('`getTripWeather` should return an array of objects with correct properties', async () => {
      const lat2 = '48.2066';
      const lon2 = '-39.3954';
      const time2 = time + 500;
      const points = [
        { lat, lon, time },
        { lat: lat2, lon: lon2, time: time2 },
      ];
      const result = await weatherApi.getTripWeather(points);
      assert.deepEqual(result, [
        { lat, lon, time, ...weatherCurrently },
        { lat: lat2, lon: lon2, time: time2, ...weatherCurrently },
      ]);
    });
  });

  describe('api-connectors', () => {
    const connectors = require('../api-connectors');
    it('`mapDatetimeToMs` should map datetime to ms since UNIX epoch', () => {
      const datetime = '2020-02-10T20:26:32.624Z';
      assert.equal(connectors.mapDatetimeToMs(datetime), 1581366392624);
    });

    xit('`transformDirectionsToWeatherPoints` should transform directions into lat/lon points with times that match the interval');
  });
});