//Renders App

import { Box, Paper } from "@mui/material";
import "./App.css";
import CountryBody from "./components/CountryBody";
import CountryPicker from "./components/CountryPicker";
import { useState } from "react";

function App() {
  const [pickedCountry, setPickedCountry] = useState("");
  // const [pickedCountryData, setPickedCountryData] = useState(null);

  const handlePick = (e) => {
    setPickedCountry(e.target.value);
  };

  // fetch("https://restcountries.com/v3.1/name/georgia")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data[0].name));

  return (
    <Box className="App">
      <CountryPicker pickedCountry={pickedCountry} handlePick={handlePick} />
      <Paper
        sx={{
          padding: 1,
          marginTop: 3,
          minHeight: 70,
        }}
      >
        {pickedCountry && <CountryBody pickedCountry={pickedCountry} />}
      </Paper>
    </Box>
  );
}

export default App;
