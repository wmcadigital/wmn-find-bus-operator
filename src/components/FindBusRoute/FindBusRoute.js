import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import AutoComplete from '../AutoComplete/AutoComplete';
import Button from '../shared/Button/Button';
import s from './FindBusRoute.module.scss';

const FindBusRoute = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const resetSearch = () => {
    autoCompleteDispatch({
      type: 'RESET_SELECTED_ITEM',
    });
  };
  const { selectedItem } = autoCompleteState;
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        {!selectedItem.operator && <h1>Find a bus company</h1>}
        <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
          {selectedItem.operator ? (
            <div className="wmnds-col-md-2-3">
              <Button
                btnClass="wmnds-btn--link wmnds-m-none"
                text="&lt; Back"
                onClick={resetSearch}
              />
              <h1>Your bus company is {selectedItem.operator.operatorName}</h1>
              <p>
                If you are only travelling on {selectedItem.operator.operatorName} buses, you can
                buy tickets which only work with these buses.
              </p>
              <a
                href="https://www.wmnetwork.co.uk/tickets/#/"
                className="wmnds-btn"
                target="_blank"
                rel="noreferrer"
              >
                Buy a {selectedItem.operator.operatorName} ticket
              </a>
            </div>
          ) : (
            <div className="wmnds-col-md-2-3">
              <div className={`${s.mainCard} bg-white`}>
                <p>
                  Search for a bus route to find out who is running your service. Private companies
                  run bus services, not West Midlands Network.
                </p>
                <div className="wmnds-m-b-md">
                  <AutoComplete resetSearch={resetSearch} />
                </div>
                <p className="wmnds-m-none">
                  If you don’t know what bus route you need,{' '}
                  <a href="https://journeyplanner.networkwestmidlands.com/" className="wmnds-link">
                    plan your journey
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
          <div className="wmnds-col-1 wmnds-col-md-1-3">
            <div className="wmnds-p-md bg-white wmnds-hide-mobile">
              <div className="wmnds-grid wmnds-grid--justify-between">
                <strong className="wmnds-col-auto">Mode of travel</strong>
                {/* <Button btnClass="wmnds-btn--link wmnds-col-auto" text="Change" /> */}
              </div>
              <p className="wmnds-m-none">Bus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBusRoute;
