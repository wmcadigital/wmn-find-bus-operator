import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const DisruptionIndicatorMedium = ({ className, iconLeft, narrow, text, title }) => {
  return (
    <div
      className={`
        wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--purple
        ${className} ${narrow ? 'wmnds-disruption-indicator-medium--narrow' : ''}
        wmnds-disruption-indicator-medium--with-icon`}
      title={title}
    >
      {/* If iconLeft, show icon left */}
      {iconLeft && (
        <Icon
          iconName={iconLeft}
          className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left"
        />
      )}
      {text}
    </div>
  );
};

// Set props
DisruptionIndicatorMedium.propTypes = {
  className: PropTypes.string,
  iconLeft: PropTypes.string,
  narrow: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
};

DisruptionIndicatorMedium.defaultProps = {
  className: '',
  iconLeft: null,
  narrow: false,
  text: null,
  title: null,
};

export default DisruptionIndicatorMedium;
