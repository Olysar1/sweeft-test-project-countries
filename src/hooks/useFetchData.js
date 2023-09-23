//Receives an URL and fetches the data
//Returns array [data, error, isLoading]

import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      console.log("request sent"); //for development purposes
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Something went wrong while fetching data");
        const data = await response.json();
        setData(
          data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        );
      } catch (err) {
        return setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return [data, error, isloading];
};

export default useFetchData;
