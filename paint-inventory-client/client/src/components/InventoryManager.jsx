import React, { useState, useEffect } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]); // Holds added inventory items
  const [folders, setFolders] = useState([]); // Holds folders from the backend

  // Fetch folders from the backend
  const fetchFolders = async () => {
    try {
      const response = await fetch('/api/inventory/folders');
      const data = await response.json();
      console.log('Fetched folders with items:', data); // Log the fetched data
      setFolders(data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  // Use effect to fetch folders on component mount
  useEffect(() => {
    fetchFolders();
  }, []);

  // Function to add inventory items locally before saving them to a folder
  const addInventoryItem = (item) => {
    setInventory((prevInventory) => {
      const updatedInventory = [...prevInventory, item];
      console.log('Updated inventory:', updatedInventory); // Log the updated inventory array
      return updatedInventory;
    });
  };
  
  // Function to save inventory to a folder
  const saveInventoryToFolder = async (folderName) => {
    console.log('Saving inventory to folder:', folderName);
    console.log('Current inventory before saving:', inventory);
  
    if (inventory.length === 0) {
      console.error('No inventory items to save.');
      return;
    }
  
    const folder = folders.find((f) => f.name === folderName);
  
    if (!folder) {
      // Create a new folder with the current inventory items
      const newFolder = { name: folderName, items: [...inventory] };
      try {
        const response = await fetch('/api/inventory/folders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFolder),
        });
        const data = await response.json();
        setFolders([...folders, data]); // Add the new folder to state
        console.log('New folder created with items:', data);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    } else {
      // Update an existing folder with the new inventory items
      const updatedFolder = { ...folder, items: [...folder.items, ...inventory] };
      try {
        const response = await fetch(`/api/inventory/folders/${folder._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFolder),
        });
        const updatedData = await response.json();
        console.log('Folder updated with items:', updatedData);
        fetchFolders(); // Re-fetch folders after updating
      } catch (error) {
        console.error('Error updating folder:', error);
      }
    }
  
    setInventory([]); // Clear the local inventory after saving
  };
  
  
  return (
    <div>
      <InventoryForm
        addInventoryItem={addInventoryItem} // Pass down the addInventoryItem function
        folders={folders} // Pass down the folder list
        saveInventoryToFolder={saveInventoryToFolder} // Pass down the save function
      />
      <InventoryList folders={folders} inventory={inventory} />
    </div>
  );
};

export default InventoryManager;
