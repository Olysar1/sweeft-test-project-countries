//Lets a user pick a country

import { MenuItem, TextField } from "@mui/material";
import useFetchData from "../hooks/useFetchData";

const CountryPicker = ({ pickedCountry, handlePick }) => {
  const [data, error, isLoading] = useFetchData(
    "https://restcountries.com/v3.1/all?fields=name"
  );

  return (
    <>
      <TextField
        label="Select a Country"
        select
        value={pickedCountry}
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
        {data &&
          data.map((country) => (
            <MenuItem key={country.name.official} value={country.name.official}>
              {country.name.common}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default CountryPicker;
