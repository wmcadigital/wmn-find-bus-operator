import React from 'react';
import PropTypes from 'prop-types';
import s from './SidebarSummary.module.scss';

const SummarySection = ({ title, value }) => {
  return (
    <div className={s.summary}>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xsm">
        <strong className="wmnds-col-2-3">{title}</strong>
        <div className="wmnds-col-1-3 wmnds-text-align-right">
          <a
            href="https://deploy-preview-34--wmn-find-a-ticket.netlify.app/"
            className="wmnds-btn wmnds-btn--link"
          >
            Change
          </a>
        </div>
      </div>
      <div>{value}</div>
    </div>
  );
};

SummarySection.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SummarySection;
