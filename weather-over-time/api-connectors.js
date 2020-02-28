const mapDatetimeToMs = datetime => new Date(datetime).getTime();

const mapWeatherPointTimes = (weatherPoints) => {
  return weatherPoints.map(point => ({
    ...point,
    time: mapDatetimeToMs(point.time),
  }));
};

const transformDirectionsToWeatherPoints = (directions, interval) => {
  //point {
  //   lat,
  //   long,
  //   time
  // }
  const intervalInSeconds = interval / 1000;
  const points = [
    {
      time: directions[0].time,
      lat: directions[0].startPoint.lat,
      long: directions[0].startPoint.lng
    }
  ];
  let nextInterval = intervalInSeconds;
  let time = 0;
  for (const direction of directions) {
    time = time + direction.time;
    if (time > nextInterval) {
      nextInterval = nextInterval + intervalInSeconds;
      points.push({
        time: time,
        lat: direction.startPoint.lat,
        long: direction.startPoint.lng
      });
    }

  }
  return points;

  // console.log(directions);
  // console.log(interval);
};

module.exports = {
  transformDirectionsToWeatherPoints,
  mapWeatherPointTimes,
  mapDatetimeToMs,
};
