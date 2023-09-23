import "./App.css";
import CountryPicker from "./components/CountryPicker";
import { useState } from "react";

function App() {
  const [pickedCountry, setPickedCountry] = useState("");

  console.log(pickedCountry);
  const handlePick = (e) => {
    setPickedCountry(e.target.value);
  };

  // fetch("https://restcountries.com/v3.1/all?fields=name")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data[0].name));

  return (
    <div className="App">
      <CountryPicker pickedCountry={pickedCountry} handlePick={handlePick} />
    </div>
  );
}

export default App;
