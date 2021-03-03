import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Imported components
import DisruptionIndicatorMedium from '../../shared/DisruptionIndicator/DisruptionIndicatorMedium';
import CloseButton from './CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch }) => {
  const { selectedItem } = autoCompleteState;
  const selectedServiceRef = useRef(null);

  const selectedService = selectedItem;

  return (
    <>
      {/* Close disruption box */}
      {!selectedService.selectedByMap && (
        <div
          className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
          ref={selectedServiceRef}
        >
          <DisruptionIndicatorMedium
            className="wmnds-p-t-xs wmnds-p-b-xs wmnds-p-l-xsm wmnds-p-r-xsm wmnds-col-auto wmnds-m-r-sm"
            severity={selectedService.severity}
            text={selectedService.serviceNumber || null}
          />
          <strong className={`wmnds-col-auto ${s.selectedSummary}`}>
            {selectedService.routeName || selectedService.stopName}
          </strong>

          <CloseButton onClick={autoCompleteDispatch} />
        </div>
      )}
    </>
  );
};

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired,
};

export default SelectedServiceHeader;
