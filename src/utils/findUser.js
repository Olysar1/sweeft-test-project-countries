//finds user using reverse geocoding and returns country
const GEOCODING_TOKEN =
  "access_token=pk.eyJ1Ijoiam9qb2xvbmVyIiwiYSI6ImNsajA0M3FyOTBnNHgzZnA5dDJnYjBtbmIifQ.z8qNmKmR-4swY0RFRSiuHg&limit=1";

export const findUser = async ([lat, lng]) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?${GEOCODING_TOKEN}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.features[0].context[0].short_code;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
