const apiKey = process.env.MAPQUEST_API_KEY;
const request = require('request-promise');

const getDirections = async (start, end, mode) => {
  let url = `http://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${start}&to=${end}`;
  // Perform get request on directions/v2/route
  let response = await request(url);
  response = JSON.parse(response);
  // TODO [ticket number] Handle variable amount of legs, rather than hard-coded 0 index
  return response.route.legs[0].maneuvers;
};

module.exports = { getDirections };
