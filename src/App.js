//Renders App

import { Box, Paper } from "@mui/material";
import "./App.css";
import CountryBody from "./components/CountryBody";
import CountryPicker from "./components/CountryPicker";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cacheItem } from "./redux/cacheActions";
import useFetchData from "./hooks/useFetchData";
import { getUserLocation } from "./utils/getUserLocation";
import { findUser } from "./utils/findUser";

function App() {
  const [pickedCountry, setPickedCountry] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useFetchData(
    `https://restcountries.com/v3.1/alpha/${pickedCountry}`,
    pickedCountry
  );

  //handles users action of picking countries
  const handlePick = (e) => {
    setPickedCountry(e.target.value);
    error && console.error(error);
    console.log(data);
    data && dispatch(cacheItem(data[0]));
  };

  //gets users country using geocoding and initializes pickedCountry
  useEffect(() => {
    userLocation &&
      findUser(userLocation).then((res) => setPickedCountry(res.toUpperCase()));
  }, [userLocation]);

  //gets asks for the users coordinates and sets userLocation
  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => console.error(error));
  }, []);

  //navigates to the picked country page
  useEffect(() => {
    navigate(`/${pickedCountry}`);
  }, [pickedCountry, navigate]);

  return (
    <Box className="App">
      <CountryPicker pickedCountry={pickedCountry} handlePick={handlePick} />
      <Routes>
        <Route
          path="/"
          element={
            <Paper
              sx={{
                padding: 1,
                marginTop: 3,
                minHeight: 70,
              }}
            ></Paper>
          }
        />
        <Route
          path="/:countryCode"
          element={
            <Paper
              sx={{
                padding: 1,
                marginTop: 3,
                minHeight: 70,
              }}
            >
              <CountryBody />
            </Paper>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
