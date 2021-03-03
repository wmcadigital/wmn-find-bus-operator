import React from 'react';
import AutoComplete from '../AutoComplete/AutoComplete';

const FindBusRoute = () => {
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        <h1>Find a bus company</h1>
        <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
          <div className="wmnds-col-md-2-3">
            <div className="wmnds-p-md bg-white">
              <p>
                Search for a bus route to find out who is running your service. Private companies
                run bus services, not West Midlands Network.
              </p>
              <h2 className="h3">Search for a bus route</h2>
              <AutoComplete />
            </div>
          </div>
          <div className="wmnds-col-md-1-3">
            <div className="wmnds-p-md bg-white">
              <strong>Mode of travel</strong>
              <p className="wmnds-m-none">Bus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBusRoute;
