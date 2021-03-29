import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';
import s from './SelectedService.module.scss';

function SelectedService({ routeName, operatorName, serviceNumber, onRemove }) {
  return (
    <div className={`wmnds-grid ${s.selectedService}`}>
      <div className="wmnds-col-auto">
        <div className={s.routeNumber}>{serviceNumber}</div>
      </div>
      <div className={`wmnds-col-auto ${s.serviceName}`}>
        {routeName} is operated by <strong>{operatorName}</strong>
      </div>
      <div className={`wmnds-col-auto ${s.removeBtn}`}>
        <Button
          iconRight="general-trash"
          text="Remove"
          btnClass="wmnds-btn--destructive"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}

SelectedService.propTypes = {
  routeName: PropTypes.string.isRequired,
  operatorName: PropTypes.string.isRequired,
  serviceNumber: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SelectedService;
