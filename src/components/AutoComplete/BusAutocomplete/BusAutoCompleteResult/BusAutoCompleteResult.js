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
      type: 'UPDATE_SELECTED_ITEM',
      payload: {
        id: result.LineId,
        operator: result.Operators.Operator[0],
        serviceNumber: result.LineName,
        routeName: result.LineName,
      },
    });
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
          text={result.LineName}
        />
      </div>
      {/* Right section */}
      <div className="wmnds-col-auto">
        {/* <div>Route name</div> Route name can go here when api is ready. */}
        <strong className={`${s.routeName}`}>{result.Operators.Operator[0].Name}</strong>
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
