import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url, method) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    setError(false);
    async function fetchReceipts(){
      try {
        const response = await axios({
          method,
          url
        })
        setData(response.data);
        setIsLoading(false);
      }catch(error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchReceipts();
  }, [url, method]);

  return {isLoading, data:data, error};
};