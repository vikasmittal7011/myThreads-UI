import { useState } from 'react';

const useFetchApiCall = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = async (api, method = 'GET', body = null, headers) => {
    setLoading(true);
    const response = await fetch(process.env.REACT_APP_API + api, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    setLoading(false);

    return await response.json();
  };

  return { loading, apiCall };
};

export default useFetchApiCall;
