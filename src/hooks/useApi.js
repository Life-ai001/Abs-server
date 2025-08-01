import { useState, useCallback } from 'react';

/**
 * Custom hook for making API calls with loading and error states
 * @param {Function} apiCall - The API function to call
 * @returns {Object} - An object containing the response data, loading state, error, and callApi function
 */
const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(...args);
      setData(response);
      return { data: response, error: null };
    } catch (err) {
      const errorMessage = err.message || 'Something went wrong';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return { data, loading, error, callApi };
};

export default useApi;
