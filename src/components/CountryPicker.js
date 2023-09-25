//Lets a user pick a country

import { MenuItem, TextField } from "@mui/material";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useRef } from "react";

const CountryPicker = ({ pickedCountry, handlePick, handleCountryList }) => {
  const countriesArrRef = useRef([]);
  const { data, error, isLoading } = useFetchData(
    "https://restcountries.com/v3.1/all?fields=name,cca2,currencies"
  );

  //generate array for local usage
  const countriesArr =
    data &&
    data.map((country) => {
      return {
        commonName: country.name.common,
        officialName: country.name.official,
        cca2: country.cca2,
      };
    });

  //generate array with the needed information
  useEffect(() => {
    if (data) {
      const countries = data.map((country) => ({
        commonName: country.name.common,
        officialName: country.name.official,
        cca2: country.cca2,
        currency: country.currencies,
      }));
      countriesArrRef.current = countries;
      handleCountryList(countries);
    }
  }, [data, handleCountryList]);

  return (
    <>
      <TextField
        label="Select a Country"
        select
        value={
          countriesArrRef.current.length === 0 ? "" : pickedCountry.slice(0, 2)
        }
        onChange={handlePick}
        fullWidth
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          },
        }}
      >
        {error && <MenuItem>{error.message}</MenuItem>}
        {isLoading && <MenuItem>Loading...</MenuItem>}
        {countriesArr &&
          countriesArr.map((country) => {
            if (country.cca2 === "AQ") return null; //Antarctica has a different structure and breaks the app(p.s the example website too...)
            return (
              <MenuItem key={country.officialName} value={country.cca2}>
                {country.commonName}
              </MenuItem>
            );
          })}
      </TextField>
    </>
  );
};

export default CountryPicker;
