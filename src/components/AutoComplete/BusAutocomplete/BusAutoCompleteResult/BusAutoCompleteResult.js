import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
// Import styles
import s from './BusAutoCompleteResult.module.scss';

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown } = props || {};
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const updateSelectedService = () => {
    autoCompleteDispatch({
      type: 'ADD_SELECTED_ITEM',
      payload: {
        id: result.id,
        operator: result.routes[0],
        serviceNumber: result.serviceNumber,
      },
    });
    autoCompleteDispatch({ type: 'SHOW_AUTOCOMPLETE', payload: false });
  };

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className={`${s.noWrap} wmnds-autocomplete-suggestions__li wmnds-grid`}
      title={result.serviceNumber}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <div>
        <DisruptionIndicatorMedium
          disruptedClass="purple"
          className="wmnds-col-auto"
          text={result.serviceNumber}
        />
      </div>
      {/* Right section */}
      <div className="wmnds-col-auto">
        <div>{result.routes[0].routeName}</div>
        <strong className={`${s.routeName}`}>
          {result.routes[0].operatorName.replace(':', "'")}
        </strong>
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
