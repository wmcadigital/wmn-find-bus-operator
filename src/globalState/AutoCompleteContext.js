import React, { useReducer, createContext } from 'react';
// Import Helper functions
import {
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const AutoCompleteContext = createContext(); // Create when context

export const AutoCompleteProvider = (props) => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    query: getSearchParam('query') || '',
    // // The selected service is used to store details when a user has clicked an autocomplete
    selectedItem: {
      id: getSearchParam('selectedItem') || null,
      operator: null,
      serviceNumber: null,
      routeName: null,
      stopName: null,
      lines: [],
      to: null,
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      case 'UPDATE_QUERY': {
        const query = 'query'; // If 'to' exists then make sure we set the correct field
        setSearchParam(query, action.query);

        return {
          ...state,
          [query]: action.query,
        };
      }
      // Update the state to show item user has selected
      case 'UPDATE_SELECTED_ITEM': {
        const item = 'selectedItem'; // If 'to' exists in payload then make sure we set the correct field
        setSearchParam(item, action.payload.id); // Set URL

        return {
          ...state,
          [item]: action.payload,
        };
      }
      // Update the state to show item user has selected
      case 'UPDATE_SELECTED_ITEM_LINES': {
        return {
          ...state,
          selectedItem: {
            ...state.selectedItem,
            lines: action.payload,
          },
        };
      }

      // Used to cancel selected service/station etc. This is mainly used when using from/to stations
      case 'RESET_SELECTED_ITEM': {
        // If action.payload ('to') exists in payload then make sure we set the correct field
        const item = 'selectedItem';
        const query = 'query';
        // Delete correct things from URL
        delSearchParam(item);
        delSearchParam(query);

        // Update state with deleted/cancelled service/item
        return {
          ...state,
          [query]: '',
          [item]: {},
        };
      }

      // Used to reset everything
      case 'RESET_SELECTED_SERVICES':
        delSearchParam('selectedItem');
        delSearchParam('query');
        return {
          query: '',
          selectedItem: {},
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [autoCompleteState, autoCompleteDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <AutoCompleteContext.Provider value={[autoCompleteState, autoCompleteDispatch]}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
