import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// Import contexts
import { AutoCompleteContext } from 'globalState';
import { getSearchParam } from 'globalState/helpers/URLSearchParams';

const useBusRoutesAPI = () => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  // Reference variables
  const mounted = useRef();
  const source = useRef();
  const apiTimeout = useRef();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const handleApiResponse = useCallback(
    (response) => {
      setLoading(false);
      let payload;

      const result = response.data.services;
      if (result.length) {
        result.forEach((service) => {
          payload = {
            id: service.id,
            operator: service.routes[0],
            serviceNumber: service.serviceNumber,
          };
          // Update selectedItem based on payload set above if item already selected
          if (!autoCompleteState.selectedItems.find((item) => item.id === service.id)) {
            autoCompleteDispatch({
              type: 'ADD_SELECTED_ITEM',
              payload,
            });
          }

          autoCompleteDispatch({
            type: 'SHOW_AUTOCOMPLETE',
            payload: false,
          });
        });
      }
    },
    [autoCompleteState.selectedItems, autoCompleteDispatch]
  );

  const handleAutoCompleteApiError = (error) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(error),
    });
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getSelectedResults = useCallback(
    (ids) => {
      source.current = axios.CancelToken.source();
      mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      startApiTimeout();
      axios
        .get(`${REACT_APP_API_HOST}/api/linebyid/${ids.join(',')}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then(handleApiResponse)
        .catch(handleAutoCompleteApiError);
    },
    [handleApiResponse, startApiTimeout]
  );

  useEffect(() => {
    if (!mounted.current) {
      if (getSearchParam('selectedItems')) {
        getSelectedResults(getSearchParam('selectedItems').split(' '));
      }
    }
    // Unmount / cleanup
    return () => {
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getSelectedResults]);

  return { loading, errorInfo, autoCompleteState };
};

export default useBusRoutesAPI;
