import React, { useState, useEffect } from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import './App.css';

const App = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch initial inventory from backend
    fetch('/api/inventory')
      .then(response => response.json())
      .then(data => setInventory(data));
  }, []);

  return (
    <div className="App">
      <h1>Painting Company Inventory Tracker</h1>
      <InventoryForm setInventory={setInventory} />
      <InventoryList inventory={inventory} />
    </div>
  );
};

export default App;
