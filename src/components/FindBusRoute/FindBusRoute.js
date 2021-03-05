import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import AutoComplete from '../AutoComplete/AutoComplete';
import Button from '../shared/Button/Button';

const FindBusRoute = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem } = autoCompleteState;
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        {!selectedItem.id && <h1>Find a bus company</h1>}
        <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
          {selectedItem.id ? (
            <div className="wmnds-col-md-2-3">
              <h1>Your bus company is {selectedItem.operator.Name}</h1>
              <p>
                If you are only travelling on {selectedItem.operator.Name} buses, you can buy
                tickets which only work with these buses.
              </p>
              <Button text={`Buy a ${selectedItem.operator.Name} ticket`} />
            </div>
          ) : (
            <div className="wmnds-col-md-2-3">
              <div className="wmnds-p-lg bg-white">
                <p>
                  Search for a bus route to find out who is running your service. Private companies
                  run bus services, not West Midlands Network.
                </p>
                <div className="wmnds-m-b-md">
                  <AutoComplete />
                </div>
                <Button
                  btnClass="wmnds-btn--link"
                  text="If you don’t know what bus route you need, plan your journey."
                />
              </div>
            </div>
          )}
          <div className="wmnds-col-md-1-3">
            <div className="wmnds-p-md bg-white">
              <div className="wmnds-grid wmnds-grid--justify-between">
                <strong className="wmnds-col-auto">Mode of travel</strong>
                <Button btnClass="wmnds-btn--link wmnds-col-auto" text="Change" />
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
