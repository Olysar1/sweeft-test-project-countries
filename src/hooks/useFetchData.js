//Receives an URL and fetches the data
//Returns array [data, error, isLoading]

import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Something went wrong while fetching data");
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);

  return [data, error, isloading];
};

export default useFetchData;
