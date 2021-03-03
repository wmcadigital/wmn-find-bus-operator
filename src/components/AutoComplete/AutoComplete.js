import React from 'react';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';

const AutoComplete = () => {
  const autoCompleteTitle = (title, subtitle = '') => {
    return (
      <div className="wmnds-col-1">
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return (
    <div className="wmnds-grid">
      {autoCompleteTitle('Search for a bus service', 'For example, X8 or 101')}
      <BusAutoComplete />
    </div>
  );
};

export default AutoComplete;
