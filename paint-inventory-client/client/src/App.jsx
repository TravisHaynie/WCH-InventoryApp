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
  const [selectedDate, setSelectedDate] = useState(''); // State to store selected log date
  const [selectedInventory, setSelectedInventory] = useState(null); // Store selected inventory

  // Function to fetch logs (replace this with your actual API call)
  const fetchLogs = async () => {
    try {
      const response = await fetch(`${baseURL}/api/inventory/logs`);
      const fetchedLogs = await response.json();

      // Get today's date in 'YYYY-MM-DD' format
      const today = new Date().toISOString().split('T')[0];

      // Check if today's log already exists
      const todayLogExists = fetchedLogs.some(log => log.date === today);

      // If today's log doesn't exist, fetch inventory data for today
      if (!todayLogExists) {
        const todayResponse = await fetch(`${baseURL}/api/inventory/folders?date=${today}`);
        const todayInventory = await todayResponse.json();

        // If there's inventory data for today, create a log and add it to the logs
        if (todayInventory.length > 0) {
          const todayLog = { date: today, inventory: todayInventory };
          fetchedLogs.unshift(todayLog);  // Add today's log at the beginning
        }
      }

      setLogs(fetchedLogs);  // Set logs including today's log if available
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();  // Fetch logs when component mounts
  }, []);

  const handleDateChange = (date) => {
    console.log("Selected Date: ", date);
  
    setSelectedDate(date);
  
    // Find the log for the selected date and update the selected inventory
    const selectedLog = logs.find(log => log.date === date);
    if (selectedLog) {
      console.log("Selected Inventory: ", selectedLog.inventory); // Log the inventory data
      setSelectedInventory(selectedLog.inventory); // Set the inventory data for the selected date
    } else {
      console.log("No log found for this date.");
    }
  };
  

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '100vh', color: 'white' }}>
      {/* Header Section */}
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
        {/* Sub-header Section */}
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

      {/* Main Content with Inventory Manager and Log Dropdown */}
      <div className="App" style={{ padding: '20px', position: 'relative' }}>
        <LogDropdown logs={logs} selectedDate={selectedDate} onDateChange={handleDateChange} />  {/* Passing logs to dropdown */}
        <InventoryManager selectedDate={selectedDate} inventory={selectedInventory} />  {/* Passing selected date and inventory to inventory manager */}
      </div>

      {/* Media Query for Responsive Title Size */}
      <style>
        {`
          @media (max-width: 768px) {
            .header-title {
              font-size: 1.8rem; /* Smaller font size for mobile */
            }

            .sub-header {
              font-size: 1.2rem; /* Adjust subtitle size on mobile */
            }
          }

          @media (min-width: 769px) {
            .header-title {
              font-size: 3rem; /* Original size for larger screens */
            }

            .sub-header {
              font-size: 1.5rem; /* Subtitle size for larger screens */
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;
