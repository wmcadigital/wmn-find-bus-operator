import React, { useRef } from 'react';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult/BusAutoCompleteResult';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const BusAutoComplete = () => {
  const { updateQuery, autoCompleteState } = useResetState();

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const { loading, errorInfo, results, getAutoCompleteResults } = useAutoCompleteAPI(
    `/api/lineinfo?q=${encodeURI(autoCompleteState.query).replace(/\D+/g, '')}`, // remove letters from query
    autoCompleteState.query
  );

  const resultsToShow = results
    .filter((item) => !autoCompleteState.selectedItems.find((s) => s.id === item.id))
    .sort((a, b) => a.serviceNumber.replace(/\D/g, '') - b.serviceNumber.replace(/\D/g, ''));

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState
  );

  return (
    <>
      <div
        className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''} ${
          !autoCompleteState.query ? 'wmnds-m-b-md wmnds-p-b-xsm' : ''
        }`}
      >
        <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <DebounceInput
          type="text"
          name="busSearch"
          placeholder="Search for a bus service"
          className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
          value={autoCompleteState.query || ''}
          onChange={(e) => updateQuery(e.target.value)}
          aria-label="Search for a bus service"
          debounceTimeout={600}
          onKeyDown={(e) => handleKeyDown(e)}
          inputRef={debounceInput}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!results.length && autoCompleteState.query && !loading && errorInfo ? (
        <Message
          type="error"
          title={errorInfo.title}
          message={errorInfo.message}
          showRetry={errorInfo?.isTimeoutError}
          retryCallback={getAutoCompleteResults}
        />
      ) : (
        // Only show autocomplete results if there is a query
        autoCompleteState.query && (
          <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
            {resultsToShow.map((result) => (
              <BusAutoCompleteResult
                key={result.id}
                result={result}
                handleKeyDown={handleKeyDown}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default BusAutoComplete;
