//Renders the information bout a country that the user chose

import { Avatar, Grid, Paper, Typography } from "@mui/material";
import CountryData from "./CountryData";
import { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Outlet, useParams } from "react-router-dom";

const CountryBody = () => {
  const [country, setCountry] = useState(null);
  const { countryCode } = useParams();

  const { data, error, isLoading } = useFetchData(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );

  useEffect(() => {
    data && setCountry(data[0]);
  }, [data]);

  return (
    <>
      {isLoading && <Typography variant="h5">Loading...</Typography>}
      {error && <Typography variant="h5">{error}</Typography>}
      {country && (
        <div>
          <Paper
            sx={{
              padding: 1,
              marginTop: 3,
              minHeight: 70,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Typography variant="h4">{country.name.common}</Typography>
              <Avatar
                src={country.flags.png}
                alt="flag"
                sx={{ borderRadius: 0, width: 45, height: 30 }}
              />
            </div>
            <Grid container>
              <CountryData infoType={"Capital"} info={country.capital[0]} />
              <CountryData
                infoType={"Continent"}
                info={country.continents[0]}
              />
              <CountryData
                infoType={"Currency"}
                info={`${Object.entries(country.currencies)[0][1].name} (${
                  Object.entries(country.currencies)[0][1].symbol
                })`}
              />
              <CountryData
                infoType={"Population"}
                info={country.population.toLocaleString()}
              />
              <CountryData
                infoType={"Region"}
                info={`${country.region}, ${country.subregion}`}
              />
              <CountryData infoType={"Borders"} info={country.borders} />
            </Grid>
          </Paper>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default CountryBody;
