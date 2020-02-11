const request = require('request-promise');
const key = process.env.DARKSKY_API_KEY;
const baseUrl = `https://api.darksky.net/forecast/${key}`;

/**
 * Retrieves the weather for a particular location at a point in time
 * @param {string} lat 
 * @param {string} lon 
 * @param {number} time 
 */
const getWeatherAtTime = async (lat, lon, time) => {
  return request(`${baseUrl}/${lat},${lon},${time}`, { json: true });
};

/**
 * Given an array of lat/lon/time points, returns the weather data from the DarkSky API for each point
 * @param {{ lat: string; lon: string; time: number }[]} points 
 */
const getTripWeather = (points) => {
  return Promise.all(points.map(async (point) => {
    const resp = await getWeatherAtTime(point.lat, point.lon, point.time);
    return { ...point, ...resp.currently };
  }));
};

module.exports = { getWeatherAtTime, getTripWeather };
