import React from 'react';
import InventoryManager from './components/InventoryManager';
import LogDropdown from './components/LogDropdown'; // Assuming you want to add the log dropdown

const colorfulTitle = (title) => {
  const color = '#FFFFFF'; // White for title

  return title.split('').map((letter, index) => (
    <span key={index} style={{ color: color, fontWeight: 'bold' }}>
      {letter}
    </span>
  ));
};

const App = () => {
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
        <LogDropdown />  {/* Assuming you want to display past logs via dropdown */}
        <InventoryManager />
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
