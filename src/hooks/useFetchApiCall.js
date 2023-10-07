import { useState } from 'react';

const useFetchApiCall = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = async (
    api,
    method = 'GET',
    body = null,
    customHeaders = {
      'Content-Type': 'application/json',
      Authentication: 'Vikas ' + localStorage.getItem('token'),
    }
  ) => {
    try {
      setLoading(true);
      const headers = new Headers(customHeaders);
      const options = {
        method,
        headers,
        credentials: 'include',
      };

      if (body !== null) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(process.env.REACT_APP_API + api, options);
      setLoading(false);

      return await response.json();
    } catch (err) {
      return err.message;
    }
  };

  return { loading, apiCall };
};

export default useFetchApiCall;
