const apiKey = process.env.MAPQUEST_API_KEY;
const request = require('request-promise');

const getDirections = async (start, end, mode) => {
  let routeType = 'fastest';
  if (mode === 'bicycle') {
    routeType = 'bicycle';
  } else if (mode === 'walking') {
    routeType = 'pedestrian';
  }
  const response = JSON.parse(await request(`http://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${start}&to=${end}&routeType=${routeType}`));
  if (response && response.route && response.route.legs[0] && response.route.legs[0].maneuvers) {
    return response.route.legs[0].maneuvers
  } else {
    throw new Error('no maneuvers found');
  }
  


};

module.exports = { getDirections };
