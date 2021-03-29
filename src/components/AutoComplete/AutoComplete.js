import React from 'react';
import useResetState from '../../customHooks/useResetState';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import Button from '../shared/Button/Button';
import Icon from '../shared/Icon/Icon';
// Import styles
import s from './AutoComplete.module.scss';
import SelectedService from './SelectedService/SelectedService';

const AutoComplete = () => {
  const {
    resetQuery,
    removeSelectedItem,
    autoCompleteState,
    autoCompleteDispatch,
  } = useResetState();

  const showSearch = () => {
    autoCompleteDispatch({ type: 'SHOW_AUTOCOMPLETE', payload: true });
  };
  const sameService = false;

  // Render the correct component based on logic in switch statement above
  return (
    <div>
      <h3 className={autoCompleteState.selectedItems.length === 0 ? 'wmnds-p-b-xsm' : ''}>
        Search for a bus route
      </h3>
      {autoCompleteState.selectedItems.length > 0 && (
        <div className="wmnds-m-b-lg">
          <>
            <div className="wmnds-m-b-md wmnds-p-b-xsm">
              {autoCompleteState.selectedItems.map((service) => (
                <SelectedService
                  key={service.id}
                  routeName={service.operator.routeName}
                  operatorName={service.operator.operatorName}
                  serviceNumber={service.serviceNumber}
                  onRemove={() => removeSelectedItem(service.id)}
                />
              ))}
            </div>
            {sameService && (
              <p>
                If you are only travelling on National Express West Midlands buses, you can buy
                tickets which only work with these buses.
              </p>
            )}
            {!autoCompleteState.showAutocomplete && (
              <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
                <div className="wmnds-col-1-1 wmnds-col-md-1-2">
                  <Button
                    text="Add another bus service"
                    iconRight="general-expand"
                    btnClass="wmnds-btn--block wmnds-btn--primary"
                    onClick={showSearch}
                  />
                </div>
                <div className="wmnds-col-1-1 wmnds-col-md-1-2">
                  <Button
                    text="Find a ticket"
                    iconRight="general-chevron-right"
                    btnClass="wmnds-btn--block wmnds-text-align-left"
                  />
                </div>
              </div>
            )}
          </>
        </div>
      )}
      {autoCompleteState.showAutocomplete && (
        <>
          <p className="wmnds-m-b-md">Enter bus route number, for example 45, X1.</p>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
            <div className={`${s.autoCompleteContainer} wmnds-col-md-3-4`}>
              <BusAutoComplete />
              {autoCompleteState.query !== '' && (
                <button
                  type="button"
                  onClick={resetQuery}
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
                  onClick={resetQuery}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoComplete;
