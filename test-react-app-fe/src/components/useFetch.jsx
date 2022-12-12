import { useEffect, useState } from "react";
import axios from "axios";

// Using Async-Await syntax
// We use Async-Await as it is an asynchronous technique that is operated via an event loop.
// Async functions will always return a value. It is the preferred way of fetching the data from an API as it enables us to remove our .then() callbacks and
//  return asynchronously resolved data. In the async block, we can use Await function to wait for the promise.

const useFetch = (method, url, body) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiError, setApiError] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body,
        });
        const data = await response?.data;
        console.log("Fetched data : ", data);
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setApiError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);
  
  return { isLoading, apiData, apiError };
};

export default useFetch;
