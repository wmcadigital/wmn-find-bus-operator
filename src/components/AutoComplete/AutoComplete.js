import React from 'react';
import PropTypes from 'prop-types';
import useResetState from '../../customHooks/useResetState';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import Button from '../shared/Button/Button';
import Icon from '../shared/Icon/Icon';
// Import styles
import s from './AutoComplete.module.scss';
import SelectedService from './SelectedService/SelectedService';

const AutoComplete = ({ loading }) => {
  const { removeSelectedItem, autoCompleteState, autoCompleteDispatch } = useResetState();

  // const { selectedItems } = autoCompleteState;
  // const [singleCompany, setSingleCompany] = useState(false);
  // const [ticketURL, setTicketURL] = useState('https://find-a-ticket.wmnetwork.co.uk/');

  const showSearch = (show = true) => {
    autoCompleteDispatch({ type: 'SHOW_AUTOCOMPLETE', payload: show });
  };

  // useEffect(() => {
  //   const isSameCompany = selectedItems.every(
  //     (service) => service.operator.operatorName === selectedItems[0].operator.operatorName
  //   );

  //   if (selectedItems.length) {
  //     if (isSameCompany) {
  //       setSingleCompany(true);
  //       setTicketURL(
  //         `https://find-a-ticket.wmnetwork.co.uk/?type=single&busCompany=${selectedItems[0].operator.operatorCode}`
  //       );
  //     } else {
  //       setSingleCompany(false);
  //       setTicketURL('https://find-a-ticket.wmnetwork.co.uk/?type=nBus');
  //     }
  //   }
  // }, [selectedItems]);

  // Render the correct component based on logic in switch statement above
  return (
    <div>
      <h3 className={autoCompleteState.selectedItems.length === 0 ? 'wmnds-p-b-xsm' : ''}>
        Search for a bus route
      </h3>
      {loading ? (
        <div className="wmnds-p-t-lg wmnds-p-b-lg">
          <div className="wmnds-loader wmnds-loader--small" role="alert" aria-live="assertive">
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        </div>
      ) : (
        <>
          {autoCompleteState.selectedItems.length > 0 && (
            <div className="wmnds-m-b-md">
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
                {/* {singleCompany ? (
                  <p>
                    If you are only travelling on {selectedItems[0].operator.operatorName} buses,
                    you can buy tickets which only work with these buses.
                  </p>
                ) : (
                  <p>
                    If you are travelling with more than one bus company, you’ll need to buy an nBus
                    ticket.
                  </p>
                )} */}
                {!autoCompleteState.showAutocomplete && (
                  <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
                    <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-m-b-md">
                      <Button
                        text="Add another bus service"
                        iconRight="general-expand"
                        btnClass={`${s.leftAlignBtn} wmnds-btn--block wmnds-btn--primary`}
                        onClick={showSearch}
                      />
                    </div>
                    {/* <div className="wmnds-col-1-1 wmnds-col-md-1-2">
                      <a
                        href={ticketURL}
                        className={`${s.leftAlignBtn} wmnds-btn wmnds-btn--block wmnds-btn__icon wmnds-btn__icon--right`}
                      >
                        {singleCompany
                          ? `Select a ${selectedItems[0].operator.operatorName} ticket`
                          : 'Select an nBus ticket'}
                        <Icon iconName="general-chevron-right" />
                      </a>
                    </div> */}
                  </div>
                )}
              </>
            </div>
          )}
        </>
      )}
      {autoCompleteState.showAutocomplete && (
        <>
          <p className="wmnds-m-b-md">Enter bus route number, for example 45, X1.</p>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
            <div className={`${s.autoCompleteContainer} wmnds-col-md-3-4`}>
              <BusAutoComplete />
              {autoCompleteState.selectedItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => showSearch(false)}
                  className={`${s.mobileReset} wmnds-hide-desktop`}
                >
                  <Icon iconName="general-cross" />
                </button>
              )}
            </div>
            <div className={`${s.desktopReset} wmnds-col-md-1-4`}>
              {autoCompleteState.selectedItems.length > 0 && (
                <Button
                  btnClass="wmnds-btn--primary wmnds-btn--block"
                  text="Cancel"
                  onClick={() => showSearch(false)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

AutoComplete.propTypes = {
  loading: PropTypes.bool,
};

AutoComplete.defaultProps = {
  loading: false,
};

export default AutoComplete;
