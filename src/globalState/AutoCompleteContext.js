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

  // Set intial state
  const initialState = {
    query: getSearchParam('query') || '',
    modes: getSearchParam('modes')?.split(' ') || null,
    // // The selected service is used to store details when a user has clicked an autocomplete
    showAutocomplete: true,
    selectedItems: [],
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
      case 'ADD_SELECTED_ITEM': {
        const item = 'selectedItems'; // If 'to' exists in payload then make sure we set the correct field
        const idIsAdded = getSearchParam(item)?.includes(action.payload.id);
        if (!idIsAdded) {
          setSearchParam(
            item,
            getSearchParam(item)
              ? `${getSearchParam(item)} ${action.payload.id}`
              : action.payload.id
          );
        }
        // Set URL
        delSearchParam('query'); // clear search param on select

        return {
          ...state,
          query: '',
          [item]: [...state[item], action.payload],
        };
      }

      // Used to cancel selected service/station etc. This is mainly used when using from/to stations
      case 'REMOVE_SELECTED_ITEM': {
        // Delete correct things from URL
        const params = getSearchParam('selectedItems')
          .split(' ')
          .filter((param) => param !== action.id);

        setSearchParam('selectedItems', params.join(' '));

        // Update state with deleted/cancelled service/item
        return {
          ...state,
          selectedItems: action.payload,
        };
      }

      // Used to cancel selected service/station etc. This is mainly used when using from/to stations
      case 'SHOW_AUTOCOMPLETE': {
        return {
          ...state,
          showAutocomplete: action.payload,
        };
      }

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
