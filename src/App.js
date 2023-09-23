import "./App.css";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import { useState } from "react";

function App() {
  const [pickedCountry, setPickedCountry] = useState(null);

  // fetch("https://restcountries.com/v3.1/all?fields=name")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data[0].name));

  return (
    <div className="App">
      <CountryPicker />
    </div>
  );
}

export default App;
