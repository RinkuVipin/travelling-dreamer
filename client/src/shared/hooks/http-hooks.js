import { useCallback, useRef, useState, useEffect } from "react";

const useHttpHooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const getRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      const httpAbortControl = new AbortController();
      activeHttpRequests.current.push(httpAbortControl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortControl.signal,
        });

        const data = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortControl
        );

        if (!response.ok) {
          throw new Error(data.message);
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong");
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    loading,
    error,
    getRequest,
    clearError,
  };
};

export default useHttpHooks;
