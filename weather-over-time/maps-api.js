const request = require('request-promise');
const apiKey = process.env.MAPQUEST_API_KEY;

const getDirections = async (start, end, mode) => {
  let url = 'http://www.mapquestapi.com/directions/v2/route?';
  url += 'key=' + apiKey + '&from=' + start + '&to=' + end + '&routeType=' + mode;
  let data = await request(url, {json: true})
    .then(data => {
      return data.route.legs[0].maneuvers;
    })

    return data;
};

module.exports = { getDirections };
