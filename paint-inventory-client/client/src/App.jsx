import React from 'react';
import InventoryManager from './components/InventoryManager';

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
          <h1 className="header-title display-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
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

      {/* Main Content */}
      <div className="App" style={{ padding: '20px', position: 'relative' }}>
        <InventoryManager />
      </div>
    </div>
  );
};

export default App;
