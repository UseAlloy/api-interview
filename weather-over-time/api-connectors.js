const mapDatetimeToSeconds = datetime => Math.floor(new Date(datetime).getTime() / 1000);

const mapWeatherPointTimes = (weatherPoints) => {
  return weatherPoints.map(point => ({
    ...point,
    time: mapDatetimeToSeconds(point.time),
  }));
};

const transformDirectionsToWeatherPoints = (directions, interval) => {};

module.exports = {
  transformDirectionsToWeatherPoints,
  mapWeatherPointTimes,
  mapDatetimeToSeconds,
};
