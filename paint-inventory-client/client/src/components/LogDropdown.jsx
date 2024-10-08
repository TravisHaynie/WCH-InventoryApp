import React from 'react';

const LogDropdown = ({ logs, selectedDate, onDateChange }) => {
  return (
    <div>
      <label htmlFor="log-dropdown">Select Date: </label>
      <select
        id="log-dropdown"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      >
        <option value="">Select a log</option>
        {logs.map((log, index) => (
          <option key={index} value={log.date}>
            {new Date(log.date).toLocaleDateString()} {/* Display the log date */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LogDropdown;
