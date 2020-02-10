const mapDatetimeToMs = datetime => new Date(datetime).getTime();

const mapWeatherPointTimes = (weatherPoints) => {
  return weatherPoints.map(point => ({
    ...point,
    time: mapDatetimeToMs(point.time),
  }));
};

const transformDirectionsToWeatherPoints = (directions, interval) => {};

module.exports = {
  transformDirectionsToWeatherPoints,
  mapWeatherPointTimes,
  mapDatetimeToMs,
};
