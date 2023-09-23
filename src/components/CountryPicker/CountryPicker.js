//Lets a user pick a country

import useFetchData from "../../hooks/useFetchData";
import "./countrypicker.css";

const CountryPicker = () => {
  const [data, error, isLoading] = useFetchData(
    "https://restcountries.com/v3.1/all?fields=name"
  );

  return (
    <>
      <select name="countries">
        <option disabled value="" selected>
          Select a Country
        </option>
        {error && <option>{error.message}</option>}
        {isLoading && <option>Loading...</option>}
        {data &&
          data.map((country) => (
            <option key={country.name.official}>{country.name.common}</option>
          ))}
      </select>
    </>
  );
};

export default CountryPicker;
