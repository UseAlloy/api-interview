const mapDatetimeToMs = datetime => new Date(datetime).getTime();

const mapWeatherPointTimes = (weatherPoints) => {
  return weatherPoints.map(point => ({
    ...point,
    time: mapDatetimeToMs(point.time),
  }));
};

const transformDirectionsToWeatherPoints = (directions, interval) => {
  let timeTaken = 0;
  let locations = [{
    lat: directions[0].startPoint.lat,
    lon: directions[0].startPoint.lng
  }];
  for (let dir of directions) {
    timeTaken += dir.time;
    if (timeTaken > 60 * 60) {
      locations.push({
        lat: dir.startPoint.lat,
        lon: dir.startPoint.lng
      });
      timeTaken -= 60 * 60;
    }
  }
  locations.push({
    lat: directions[directions.length - 1].startPoint.lat,
    lon: directions[directions.length - 1].startPoint.lng
  });

    console.log(locations);
    return locations;
};

module.exports = {
  transformDirectionsToWeatherPoints,
  mapWeatherPointTimes,
  mapDatetimeToMs,
};
