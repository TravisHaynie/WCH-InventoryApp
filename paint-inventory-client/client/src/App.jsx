import React, { useState, useEffect } from 'react';
import InventoryManager from './components/InventoryManager';

import './App.css';
import './index.css';

const App = () => {
  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="header-title">WCH Precision Color</h1>
        <p className="subtitle">Inventory Management System</p>
        <InventoryManager />
      </div>
    </div>
  );
};

export default App;

