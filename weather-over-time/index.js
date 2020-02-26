require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const weatherApi = require('./weather-api');
const mapsApi = require('./maps-api');
const connectors = require('./api-connectors');

const app = new Koa();
const router = new Router();

const PORT = 3000;

const TIME_INTERVAL = 60 * 60 * 1000; // 1 hour in ms

router.get('/route-weather', async (ctx, next) => {
  try {
    /**
     * Starting address, end address, and mode of transport are provided as request query params.
     * For `mode`, let's support walking and bicycling to start out.
     */
    const { start, end, mode } = ctx.query;
    const interval = TIME_INTERVAL;
    /**
     * Implement the `mapsApi.getDirections` and `connectors.transformDirectionsToWeatherPoints` functions.
     * We've already implemented a connection to the DarkSky API. You'll have to check out the weather-api.js
     * file to see what sort of format the `getTripWeather` function is expecting.
     */
    const directions = await mapsApi.getDirections(start, end, mode);
    const weatherPoints = connectors.transformDirectionsToWeatherPoints(directions, interval);
    console.log(weatherPoints);
    /**
     * The two functions below are already implemented.
     */
    
    const weatherPointsWithMappedTimes = connectors.mapWeatherPointTimes(weatherPoints);
    const tripForecast = await weatherApi.getTripWeather(weatherPointsWithMappedTimes);
    ctx.body.forecast = tripForecast;
  } catch (err) {
    console.error('Error processing request', err);
    ctx.throw(500, 'Server error');
  }
  await next();
});

module.exports = app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => console.log(`weather-over-time server listening on port ${PORT}`));
