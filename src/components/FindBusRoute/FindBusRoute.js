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
              <h1>Your bus company is {selectedItem.operator.Name}</h1>
              <p>
                If you are only travelling on {selectedItem.operator.Name} buses, you can buy
                tickets which only work with these buses.
              </p>
              <Button text={`Buy a ${selectedItem.operator.Name} ticket`} />
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
                <div className="wmnds-grid">
                  <div className="wmnds-col-md-3-4">
                    <details className="wmnds-details">
                      <summary className="wmnds-link">
                        If you don’t know what bus route you need, plan your journey.
                      </summary>
                      <div className="wmnds-details__content">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium unde
                          nam consequuntur a id odio? Minus dolorum nobis unde officia asperiores
                          quam harum? Eos odit dolores maxime rem exercitationem nostrum.
                        </p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="wmnds-col-1 wmnds-col-md-1-3">
            <div className="wmnds-p-md bg-white wmnds-hide-mobile">
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
