import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response error " + response.statusText);
        }

        const responseData = await response.json();

        setData(responseData);
      } catch (e) {
        setError(e);
      }

      setLoading(false);
    };

    setLoading(true);
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;
