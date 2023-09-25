//Renders information about airports in the picked country

import { Grid, Input, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const AIRPORTS_API_KEY = "2oSJO3D5MMLUsO8cRJ6kNA==wDcNYghgUJZnkWjx";

const AirportsTabPanel = ({ pickedCountry }) => {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [userInput, setUserInput] = useState("");
  const newPickedCountry = pickedCountry.slice(0, 2);

  //fetch airoports data
  useEffect(() => {
    fetch(
      `https://api.api-ninjas.com/v1/airports?country=${newPickedCountry}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": AIRPORTS_API_KEY,
          "Content-Type": "application-json",
        },
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong during fetching aeroport data");
        return response.json();
      })
      .then((data) => setAirports(data))
      .catch((err) => console.error(`Error: ${err}`));
  }, [newPickedCountry]);

  //filter airports
  const filterMatch = (original, substring) => {
    if (!substring) {
      return original;
    } else {
      return original.filter((airport) =>
        airport.name.toLowerCase().includes(substring.toLowerCase())
      );
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userInput) setFilteredAirports(filterMatch(airports, userInput));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userInput, airports]);

  //handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    console.log(userInput);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Airports
      </Typography>
      <Input
        onChange={handleUserInput}
        placeholder="Search for airport"
      ></Input>
      <Grid container>
        {(userInput &&
          filteredAirports.map((airport) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                key={airport.icao}
                sx={{ paddingTop: 2 }}
              >
                <Typography variant="body1">{`${airport.icao} - ${airport.name} (${airport.city})`}</Typography>
              </Grid>
            );
          })) ||
          (airports &&
            airports.map((airport) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={airport.icao}
                  sx={{ paddingTop: 2 }}
                >
                  <Typography variant="body1">{`${airport.icao} - ${airport.name} (${airport.city})`}</Typography>
                </Grid>
              );
            }))}
      </Grid>
    </Paper>
  );
};

export default AirportsTabPanel;
