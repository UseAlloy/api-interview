# Introduction

I like to take long bike rides, and I like to know the weather ahead of time. But my bike rides often take me 60+ miles away from home, and last over many hours! I can check the weather forecast in the morning at my origin point, but what about in the afternoon? Ideally what I'd like is an hourly weather forecast which accounts for the fact that I will have travelled an incremental distance throughout the day.

# Objective

Candidates will create an API endpoint which takes in a start and end location (ideally something which can be "geocoded"), and a mode of transportation (e.g. `car`, `bicycle`, or `walking`) and returns an hourly (or optionally custom interval) weather forecast which includes, at minimum, the temperature, percent chance precipitation, and location (latitude and longitude) at each hour (or custom interval).

We've already set up a connection with the DarkSky API for weather and created a function that retrieves weather data for a list of locations and times. It will be up to you to get directions data from a maps API (Google Maps, MapQuest, or similar) and wrangle those directions into something that we can get the weather for. Exactly how the API response looks will be up to you. You may encounter a bug in the existing code along the way!

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
      "city": "NYC",
      "state": "New York",
      "postcode": "11226",
      "country": "United States of America",
      "weather": {
        "summary": "Mostly Cloudy",
        "precipProbability": 0,
        "temperature": 55.36,
      }
    },
    {
      "lng": -73.97274328005592,
      "lat": 40.791933868592736,
      "time": 1557200212,
      "city": "NYC",
      "state": "New York",
      "postcode": "10025",
      "country": "United States of America",
      "weather": {
        "summary": "Mostly Cloudy",
        "precipProbability": 0,
        "temperature": 55.73,
      }
    },
    {
      "lng": -73.87215712846864,
      "lat": 40.94276710996917,
      "time": 1557203812,
      "city": "Yonkers",
      "state": "New York",
      "postcode": "10701",
      "country": "United States of America",
      "weather": {
        "summary": "Partly Cloudy",
        "precipProbability": 0.02,
        "temperature": 53.73,
      }
    },
    {
      "lng": -73.82096421291052,
      "lat": 41.12169586126841,
      "time": 1557207412,
      "state": "New York",
      "postcode": "10532",
      "country": "United States of America",
      "weather": {
        "summary": "Partly Cloudy",
        "precipProbability": 0.01,
        "temperature": 52.05,
      }
    },
    {
      "lng": -73.76151578011472,
      "lat": 41.31119424665392,
      "time": 1557211012,
      "state": "New York",
      "postcode": "10598",
      "country": "United States of America",
      "weather": {
        "summary": "Partly Cloudy",
        "precipProbability": 0.01,
        "temperature": 51.15,
      }
    }
  ]
}
```

# Tasks
Think of steps 1 and 2 as the MVP -- they're the most important to get done, so it's totally ok if most or all of your time is spent on them.
1. Implement the `mapsApi.getDirections` function. This should simply make a request to the maps API of your choice and retrieve the appropriate directions, given user input.
2. Implement the `connectors.transformDirectionsToWeatherPoints` helper function. The purpose of this function is to take the output of the maps API and transform it into something that our `weatherApi.getTripWeather` function can deal with. Your transformation should use the `interval` input to return an array of lat/lon points with times that describe the user's location at evenly spaced intervals. For the time being you can assume that the user is planning to leave immediately (i.e. the first point in the returned array should have the current time).
3. Now we've implemented everything for our MVP, but there seems to be a bug. Can you debug what's going wrong?
4. We've got a failing test and an unimplemented test. Let's get all our tests running and passing.
5. Let's add some more features! First, allow users to specify the time interval of weather reports that they want to receive from the API.
6. Now, let's let users start the trip at some point in the future instead of right now.
7. Finally, let's implement any transport methods that we don't have yet out of 'bicycle', 'walking', and 'car'.
