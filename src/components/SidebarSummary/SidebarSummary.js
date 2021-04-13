import React from 'react';
import PropTypes from 'prop-types';
import SummarySection from './SummarySection';

// helpers
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const arrayToSentence = (array) => {
  let sentence;
  if (array.length > 2) {
    sentence = `${array.slice(0, array.length - 1).join(', ')} and ${array.slice(-1)}`;
  } else if (array.length === 2) {
    sentence = `${array[0]} and ${array[1]}`;
  } else {
    [sentence] = array;
  }
  return sentence;
};

const SidebarSummary = ({ modes }) => {
  const capitalizedModes = modes.map((m) => capitalize(m));

  return (
    <div className="bg-white wmnds-p-md">
      <SummarySection title="Mode of travel" value={arrayToSentence(capitalizedModes)} />
    </div>
  );
};

SidebarSummary.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SidebarSummary;
