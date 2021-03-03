import React from 'react';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';

const AutoComplete = () => {
  const autoCompleteTitle = (title, subtitle = '') => {
    return (
      <div className="wmnds-col-1">
        <h2 className="h3">{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return (
    <div className="wmnds-grid">
      {autoCompleteTitle('Search for a bus route', 'Enter bus route number, for example 45, X1.')}
      <BusAutoComplete />
    </div>
  );
};

export default AutoComplete;
