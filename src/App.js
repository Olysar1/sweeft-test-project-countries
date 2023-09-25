//Renders App

import { Box, Paper } from "@mui/material";
import "./App.css";
import CountryBody from "./components/CountryBody";
import CountryPicker from "./components/CountryPicker";
import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cacheItem } from "./redux/cache/cacheActions";
import useFetchData from "./hooks/useFetchData";
import { getUserLocation } from "./utils/getUserLocation";
import { findUser } from "./utils/findUser";
import BottomTabsComponent from "./components/BottomTabsComponent";

function App() {
  const [pickedCountry, setPickedCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const prevPickedCountryRef = useRef(pickedCountry);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error } = useFetchData(
    `https://restcountries.com/v3.1/alpha/${pickedCountry}`,
    pickedCountry
  );

  //check the url and set "pickedCountry" if we are not home or "/GE"
  useEffect(() => {
    const locationCheck = location.pathname.slice(1);
    if (locationCheck !== "") setPickedCountry(locationCheck);
  }, [location.pathname]);

  //saves a list of countries in "countryList" //format[{commonName:..., officialName:..., cca2:...},{...}...]
  const handleCountryList = useCallback((arr) => {
    setCountryList(arr);
  }, []);

  //handles users action of picking countries
  const handlePick = (e) => {
    setPickedCountry(e.target.value);
    error && console.error(error);
    data && dispatch(cacheItem(data[0]));
  };

  //gets users country using geocoding and initializes pickedCountry
  useEffect(() => {
    if (location.pathname === "/") {
      userLocation &&
        findUser(userLocation).then((res) =>
          setPickedCountry(res.toUpperCase())
        );
    }
  }, [userLocation, location.pathname]);

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
    if (prevPickedCountryRef.current !== pickedCountry) {
      navigate(`/${pickedCountry}`);
      prevPickedCountryRef.current = pickedCountry;
    }
  }, [pickedCountry, navigate]);

  return (
    <Box className="App">
      <CountryPicker
        pickedCountry={pickedCountry}
        handlePick={handlePick}
        handleCountryList={handleCountryList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Paper
                sx={{
                  padding: 1,
                  marginTop: 3,
                  minHeight: 70,
                }}
              ></Paper>
              <BottomTabsComponent />
            </div>
          }
        />
        <Route path="/:countryCode" element={<CountryBody />}>
          <Route
            path=""
            element={
              <BottomTabsComponent
                pickedCountry={pickedCountry}
                countryList={countryList}
                show={"1"}
              />
            }
          />
          <Route
            path="airports"
            element={
              <BottomTabsComponent pickedCountry={pickedCountry} show={"2"} />
            }
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
