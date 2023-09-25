import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  Box,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const ExchangeTabPanel = ({ pickedCountry, countryList }) => {
  const [secondCountryCode, setSecondCountryCode] = useState("");
  const [firstCountry, setFirstCountry] = useState(null);
  const [secondCountry, setSecondCountry] = useState(null);
  const [currencyOutput, setCurrencyOutput] = useState(null);
  const [userInput, setUserInput] = useState("1");

  //gets country data with provided cca2 code
  const getCountryData = useCallback(
    (countryCode) => {
      return countryList.find((country) => country.cca2 === countryCode);
    },
    [countryList]
  );

  //gets currency symbol and key from provided country object
  const getCountryCurrencyData = (countryObj) => {
    const currencyKey = Object.values(Object.keys(countryObj.currency))[0];
    return {
      currencyKey: currencyKey,
      symbol: countryObj.currency[currencyKey].symbol,
    };
  };

  //initialize first and second country states
  useEffect(() => {
    pickedCountry && setFirstCountry(getCountryData(pickedCountry));
    secondCountryCode && setSecondCountry(getCountryData(secondCountryCode));
  }, [pickedCountry, secondCountryCode, getCountryData]);

  //handle currency section country pick
  const handleSecondCountry = (e) => {
    setSecondCountryCode(e.target.value);
  };
  //   secondCountryCode && console.log(secondCountryCode); //for development

  //handle currency user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  //   userInput && console.log(userInput); //for development

  //exchange currency on users request
  useEffect(() => {
    if (firstCountry && secondCountry) {
      const from = getCountryCurrencyData(firstCountry).currencyKey;
      const to = getCountryCurrencyData(secondCountry).currencyKey;

      fetch(
        `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${userInput}`
      )
        .then((response) => {
          if (!response.ok)
            throw new Error("something went wrong while converting currency");
          return response.json();
        })
        .then((data) => {
          setCurrencyOutput(data);
        });
    }
  }, [userInput, firstCountry, secondCountry]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4">CURRENCY EXCHANGE</Typography>
      <FormControl variant="standard">
        <InputLabel>{secondCountry ? secondCountry.commonName : ""}</InputLabel>
        <Select
          onChange={handleSecondCountry}
          value={""}
          sx={{ width: 300 }}
          label={"country"}
          MenuProps={{
            PaperProps: { sx: { maxHeight: 300 } },
          }}
        >
          {countryList.map((country) => (
            <MenuItem key={country.cca2} value={country.cca2}>
              {country.commonName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box width="100%" sx={{ marginTop: 3 }}>
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <FormControl sx={{ width: "40%" }}>
            <TextField
              value={firstCountry ? userInput : ""}
              onChange={handleUserInput}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {firstCountry &&
                      getCountryCurrencyData(firstCountry).symbol}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Typography variant="h4" sx={{ width: "40%", textAlign: "center" }}>
            =
          </Typography>
          <FormControl sx={{ width: "40%" }}>
            <TextField
              value={currencyOutput ? currencyOutput.result.toFixed(2) : ""}
              disabled
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {secondCountry &&
                      getCountryCurrencyData(secondCountry).symbol}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ExchangeTabPanel;
