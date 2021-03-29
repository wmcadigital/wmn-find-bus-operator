import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useResetState = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  const removeSelectedItem = (id) => {
    const payload = autoCompleteState.selectedItems.filter((item) => item.id !== id);
    autoCompleteDispatch({ type: 'REMOVE_SELECTED_ITEM', id, payload });
    if (!payload.length) {
      autoCompleteDispatch({ type: 'SHOW_AUTOCOMPLETE', payload: true });
    }
  };

  const resetQuery = () => {
    autoCompleteDispatch({
      type: 'RESET_QUERY',
    });
  };

  // Function used in busautocomplete.js to update busautocomplete state and reset any state "below" it in the tray
  const updateQuery = (query) => {
    autoCompleteDispatch({ type: 'UPDATE_QUERY', query: query.trim() }); // Update query to what user has typed & trim
  };

  return {
    updateQuery,
    resetQuery,
    autoCompleteState,
    autoCompleteDispatch,
    removeSelectedItem,
  };
};

export default useResetState;
