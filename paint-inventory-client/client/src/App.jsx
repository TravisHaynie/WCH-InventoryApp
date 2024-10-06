import React, { useState, useEffect } from 'react';
import InventoryManager from './components/InventoryManager';

import './App.css';
import './index.css';

const App = () => {
  return (
    <div className="App">
      <h1>Painting Company Inventory Tracker</h1>
      <InventoryManager />
    </div>
  );
};

export default App;

