import React, { useContext } from 'react';
// Import context
import { AutoCompleteContext } from 'globalState';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import Button from '../shared/Button/Button';

const AutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const resetSearch = () => {
    autoCompleteDispatch({
      type: 'RESET_SELECTED_ITEM',
    });
  };
  const autoCompleteTitle = (title, subtitle = '') => {
    return (
      <div>
        <h2 className="h3">{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return (
    <div>
      {autoCompleteTitle('Search for a bus route', 'Enter bus route number, for example 45, X1.')}
      <div className="wmnds-grid wmnds-grid--spacing-2-md">
        <div className="wmnds-col-3-4">
          <BusAutoComplete />
        </div>
        <div className="wmnds-col-1-4">
          {autoCompleteState.query !== '' && (
            <Button
              btnClass="wmnds-btn--primary wmnds-btn--block"
              text="Cancel"
              onClick={resetSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
