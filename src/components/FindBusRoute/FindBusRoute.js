import React from 'react';
import useBusRoutesAPI from './customHooks/useBusRoutesAPI';
import AutoComplete from '../AutoComplete/AutoComplete';
import SidebarSummary from '../SidebarSummary/SidebarSummary';
import s from './FindBusRoute.module.scss';

const FindBusRoute = () => {
  const { loading, autoCompleteState } = useBusRoutesAPI();
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-m-b-lg wmnds-grid">
      <div className="wmnds-col-1">
        {autoCompleteState.modes && (
          <a href="https://find-a-ticket.wmnetwork.co.uk">&lt; Back to ticket finder</a>
        )}
        <h1>Find a bus company</h1>
        <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
          <div className="wmnds-col-md-2-3">
            <div className={`${s.mainCard} bg-white`}>
              <p>
                Search for a bus route to find out who is running your service. Private companies
                run bus services, not West Midlands Network.
              </p>
              <div className="wmnds-m-b-md">
                <AutoComplete loading={loading} />
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
          <div className="wmnds-col-1 wmnds-col-md-1-3">
            {autoCompleteState.modes && <SidebarSummary modes={autoCompleteState.modes} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBusRoute;
