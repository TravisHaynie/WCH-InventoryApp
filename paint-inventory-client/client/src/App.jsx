import React, { useState, useEffect } from 'react';
import InventoryManager from './components/InventoryManager';
import LogDropdown from './components/LogDropdown';
const baseURL = import.meta.env.VITE_API_URL || 'https://wch-inventoryapp.onrender.com';

const colorfulTitle = (title) => {
  const color = '#FFFFFF'; // White for title

  return title.split('').map((letter, index) => (
    <span key={index} style={{ color: color, fontWeight: 'bold' }}>
      {letter}
    </span>
  ));
};

const App = () => {
  const [logs, setLogs] = useState([]); // State to store logs
  const [selectedInventory, setSelectedInventory] = useState(null); // Store selected inventory from logs

  // Function to fetch logs
  const fetchLogs = async () => {
    try {
      const response = await fetch(`${baseURL}/api/inventory/logs`);
      const fetchedLogs = await response.json();
      setLogs(fetchedLogs);  // Set logs
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();  // Fetch logs when component mounts
  }, []);

  const handleDateChange = (date) => {
    const selectedLog = logs.find(log => log.date === date);
    if (selectedLog && Array.isArray(selectedLog.inventory)) {
      setSelectedInventory(selectedLog.inventory); // Set the inventory data for the selected date
    } else {
      setSelectedInventory([]); // Clear inventory if no valid log is selected
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '100vh', color: 'white' }}>
      <header style={{
        backgroundColor: '#FFA500', // Orange header background
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background for the title
          padding: '10px 20px',
          borderRadius: '10px',
          display: 'inline-block',
        }}>
          <h1 className="header-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            {colorfulTitle('WCH Precision Color')}
          </h1>
        </div>
        <div>
          <h2 className="sub-header" style={{
            color: '#F5F5DC', // Cream color for subtitle
            marginTop: '10px',
            fontSize: '1.5rem',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}>
            Inventory Management System
          </h2>
        </div>
      </header>

      <div className="App" style={{ padding: '20px', position: 'relative' }}>
        <LogDropdown logs={logs} onDateChange={handleDateChange} />
        <InventoryManager inventory={selectedInventory} />  {/* Passing selected inventory from logs */}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .header-title {
              font-size: 1.8rem;
            }

            .sub-header {
              font-size: 1.2rem;
            }
          }

          @media (min-width: 769px) {
            .header-title {
              font-size: 3rem;
            }

            .sub-header {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
