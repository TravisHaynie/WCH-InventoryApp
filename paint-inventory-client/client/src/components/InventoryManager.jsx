import React, { useState, useEffect } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

const InventoryManager = () => {
  const [folders, setFolders] = useState([]);
  const [inventory, setInventory] = useState([]);

  const fetchFolders = async () => {
    try {
      const response = await fetch('/api/inventory/folders');
      const data = await response.json();
      setFolders(data);
      console.log('Fetched folders:', data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const saveInventoryToFolder = async (folderName, item) => {
    console.log('Saving inventory to folder:', folderName, item);
  
    const folder = folders.find((f) => f.name === folderName);
  
    if (!folder) {
      // Create a new folder if one doesn't exist
      const newFolder = { name: folderName, items: [item] };
      try {
        const response = await fetch('/api/inventory/folders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFolder),
        });
        const data = await response.json();
        setFolders([...folders, data]); // Update the folders in the state
        console.log('New folder created with items:', data);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    } else {
      // Update an existing folder with the new item
      const updatedFolder = { items: [item] }; // Properly structure items
      try {
        const response = await fetch(`/api/inventory/folders/${folder._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFolder), // Only update the items
        });
        const data = await response.json();
        console.log('Folder updated with items:', data);
        fetchFolders(); // Re-fetch folders to update the UI
      } catch (error) {
        console.error('Error updating folder:', error);
      }
    }
  
    setInventory([]); // Clear the inventory after saving
  };
  
  
  return (
    <div>
      <InventoryForm
        addInventoryItem={setInventory}
        folders={folders}
        saveInventoryToFolder={saveInventoryToFolder}
      />
      <InventoryList folders={folders} />
    </div>
  );
};

export default InventoryManager;
