import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import context
import { AutoCompleteContext } from 'globalState';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import Button from '../shared/Button/Button';
import Icon from '../shared/Icon/Icon';
// Import styles
import s from './AutoComplete.module.scss';

const AutoComplete = ({ resetSearch }) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
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
      <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
        <div className={`${s.autoCompleteContainer} wmnds-col-md-3-4`}>
          <BusAutoComplete />
          {autoCompleteState.query !== '' && (
            <button
              type="button"
              onClick={resetSearch}
              className={`${s.mobileReset} wmnds-hide-desktop`}
            >
              <Icon iconName="general-cross" />
            </button>
          )}
        </div>
        <div className={`${s.desktopReset} wmnds-col-md-1-4`}>
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

AutoComplete.propTypes = {
  resetSearch: PropTypes.func.isRequired,
};

export default AutoComplete;
