import React from 'react';

const LogDropdown = ({ logs, selectedDate, handleDateChange }) => {
  return (
    <div>
      <label htmlFor="logDropdown" style={{ marginRight: '10px', fontWeight: 'bold' }}>View Logs:</label>
      <select
        id="logDropdown"
        value={selectedDate}
        onChange={handleDateChange}
        className="form-select"
        style={{ width: '200px', display: 'inline-block' }}
      >
        <option value="">Select a date</option>
        {logs.map((log, index) => (
          <option key={index} value={log.date}>
            {new Date(log.date).toLocaleDateString()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LogDropdown;
