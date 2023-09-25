//Receives an URL and fetches the data
//Returns array [data, error, isLoading]

import { useEffect, useState } from "react";
import { useStore } from "react-redux";

const useFetchData = (url, pickedCountry = "") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const store = useStore();
  const cachedData = store.getState().cache;

  useEffect(() => {
    const abortControl = new AbortController();

    (async function () {
      if (url.endsWith("/alpha/")) return;

      try {
        setIsLoading(true);
        const isCountryInCache = cachedData.some(
          (country) => country.cca2 === pickedCountry
        );
        //check if country is in redux store
        if (isCountryInCache) {
          const cachedCountry = cachedData.find(
            (country) => country.cca2 === pickedCountry
          );
          setData([{ ...cachedCountry }]);
          return;
        } else {
          console.log("request sent"); //for development purposes

          const response = await fetch(url, { signal: abortControl.signal });
          if (!response.ok)
            throw new Error("Something went wrong while fetching data");
          const data = await response.json();
          const finalData = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
          );
          setData(finalData);
        }

        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        } else {
          setError(err);
          setIsLoading(false);
        }
      }
    })();
    return () => abortControl.abort();
  }, [url, cachedData, pickedCountry]);

  return { data, error, isloading };
};

export default useFetchData;
