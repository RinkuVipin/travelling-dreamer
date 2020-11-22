const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "pk.32018a9d1fa31a85131b509bc8707dc9";

async function getPlaceCoordinates(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&format=json&q=${address}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const lat = parseFloat(data[0].lat);
  const lng = parseFloat(data[0].lon);
  const coordinates = {
    lat,
    lng,
  };
  return coordinates;
}

module.exports = getPlaceCoordinates;
