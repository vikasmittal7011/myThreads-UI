import { useState } from 'react';

import useToastBox from './useToastBox';

const useFetchApiCall = () => {
  const { showToast } = useToastBox();
  const [loading, setLoading] = useState(false);

  const apiCall = async (
    api,
    method = 'GET',
    body = null,
    customHeaders = {
      'Content-Type': 'application/json',
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

      const data = await response.json();
      if (data.success) {
        return data;
      } else {
        showToast('Error', data.message, 'error');
        return false;
      }
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  return { loading, apiCall };
};

export default useFetchApiCall;
