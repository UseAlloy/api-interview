const moment = require('moment');

const mapDatetimeToMs = datetime => new Date(datetime).getTime();

const mapWeatherPointTimes = (weatherPoints) => {
  return weatherPoints.map(point => ({
    ...point,
    time: mapDatetimeToMs(point.time),
  }));
};

const transformDirectionsToWeatherPoints = (directions, interval) => {
  let points = new Array();
  let runningtime = moment();

  for (let maneuver = 0; maneuver < directions.length; maneuver++) {
    const maneu = directions[maneuver];
    runningtime = runningtime.add(moment(maneu.formattedTime));
    points.push({
      lat: maneu.startPoint.lat, 
      lon: maneu.startPoint.lng, 
      time: runningtime.format()});
  }

  return points;

};

module.exports = {
  transformDirectionsToWeatherPoints,
  mapWeatherPointTimes,
  mapDatetimeToMs,
};
