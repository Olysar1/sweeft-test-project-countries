//Renders information about airports in the picked country

import { Grid, Input, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const AIRPORTS_API_KEY = "2oSJO3D5MMLUsO8cRJ6kNA==wDcNYghgUJZnkWjx";

const AirportsTabPanel = ({ pickedCountry }) => {
  const [airports, setAirports] = useState([]);
  const newPickedCountry = pickedCountry.slice(0, 2);

  console.log(newPickedCountry);

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

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Airports
      </Typography>
      <Input placeholder="Search for airport"></Input>
      <Grid container>
        {airports &&
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
          })}
      </Grid>
    </Paper>
  );
};

export default AirportsTabPanel;
