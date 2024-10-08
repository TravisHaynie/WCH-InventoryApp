import React from 'react';
import InventoryManager from './components/InventoryManager';

const colorfulTitle = (title) => {
  // Update to white or cream
  const color = '#F5F5DC'; // White
  // const color = '#F5F5DC'; // Cream

  return title.split('').map((letter, index) => (
    <span key={index} style={{ color: color, fontWeight: 'bold' }}>
      {letter}
    </span>
  ));
};

const App = () => {
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
          <h1 className="header-title display-3" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
            {colorfulTitle('WCH Precision Color')}
          </h1>
        </div>
        <div>
          <p className="subtitle">Inventory Management System</p>
        </div>
      </header>
      <div className="App" style={{ padding: '20px', position: 'relative' }}>
        <InventoryManager />
      </div>
    </div>
  );
};

export default App;
