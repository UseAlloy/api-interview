# Introduction

I like to take long bike rides, and I like to know the weather ahead of time. But my bike rides often take me 60+ miles away from home, and last over many hours! I can check the weather forecast in the morning at my origin point, but what about in the afternoon? Ideally what I'd like is an hourly weather forecast which accounts for the fact that I will have travelled an incremental distance throughout the day.

# Objective

Candidates will create an API endpoint which takes in a start and end location, and a mode of transportation (e.g. `car`, `bicycle`, or `walking`) and returns an hourly weather forecast which includes the temperature, percent chance precipitation, and location (latitude and longitude) at each hour.

We've already set up a connection with the DarkSky API for weather and created a function that retrieves weather data for a list of locations and times. It will be up to you to get directions data from the MapQuest API and wrangle those directions into something that we can get the weather for. Exactly how the API response looks will be up to you.

Your API may look something like this:
### Request:
`GET /route-weather?start=Brooklyn, NY&end=Brewster, NY&mode=bicycle&increment=60`
### Response:
```json
{
  "forecast": [
    {
      "lng": -73.949371,
      "lat": 40.648922,
      "time": 1557196612,
      "weather": {
        "summary": "Mostly Cloudy",
        "precipProbability": 0,
        "temperature": 55.36,
      }
    },
    {
      "lng": -73.87215712846864,
      "lat": 40.94276710996917,
      "time": 1557203812,
      "weather": {
        "summary": "Partly Cloudy",
        "precipProbability": 0.02,
        "temperature": 53.73,
      }
    },
    {
      "lng": -73.76151578011472,
      "lat": 41.31119424665392,
      "time": 1557211012,
      "weather": {
        "summary": "Partly Cloudy",
        "precipProbability": 0.01,
        "temperature": 51.15,
      }
    }
  ]
}
```

# Setup
1. Clone the `api-interview` repo to your computer.
2. Navigate to the `weather-over-time` directory and add a `.env` file with credentials provided by your interviewer.
3. Run the following:
```sh
npm install          # installs the dependencies
npm test             # tests will fail, that's ok
npm run start-dev    # starts the server in development mode
```

# Tasks
Think of steps 1 and 2 as the MVP -- they're the most important to get done, so it's totally ok if most or all of your time is spent on them.
1. Implement the `mapsApi.getDirections` function. This should simply make a request to the MapQuest API and retrieve the appropriate directions, given user input ([MapQuest Directions API Docs](https://developer.mapquest.com/documentation/directions-api/)).
2. Implement the `connectors.transformDirectionsToWeatherPoints` helper function. The purpose of this function is to take the output of the maps API and transform it into something that our `weatherApi.getTripWeather` function can deal with. Your transformation should use the `interval` input to return an array of lat/lon points with times that describe the user's location at evenly spaced intervals. For the time being you can assume that the user is planning to leave immediately (i.e. the first point in the returned array should have the current time).
3. Now we've implemented everything for our MVP, but there seems to be a bug. Can you debug what's going wrong?
4. We've got a failing test and an unimplemented test. Let's get all our tests running and passing.
5. Let's add some more features! First, allow users to specify the time interval of weather reports that they want to receive from the API.
6. Now, let's let users start the trip at some point in the future instead of right now.
7. Finally, let's implement any transport methods that we don't have yet out of 'bicycle', 'walking', and 'car'.
