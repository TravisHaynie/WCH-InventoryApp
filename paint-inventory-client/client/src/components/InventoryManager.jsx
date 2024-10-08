import React, { useState, useEffect } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

const baseURL = import.meta.env.VITE_API_URL || 'https://wch-inventoryapp.onrender.com';

const InventoryManager = ({ inventory }) => {  // Removed `selectedDate` prop
  const [folders, setFolders] = useState([]);

  const fetchFolders = async () => {  // Removed `date` from fetchFolders
    try {
      const response = await fetch(`${baseURL}/api/inventory/folders`);
      const data = await response.json();
      setFolders(Array.isArray(data) ? data : []);  // Ensure fetched data is an array
    } catch (error) {
      console.error('Error fetching folders:', error);
      setFolders([]);  // Fallback to an empty array in case of error
    }
  };

  useEffect(() => {
    if (Array.isArray(inventory) && inventory.length > 0) {
      console.log("Inventory: ", inventory); // Log the inventory data
      setFolders(inventory);
    } else {
      fetchFolders();  // Fetch all folders on mount
    }
  }, [inventory]);

  const saveInventoryToFolder = async (folderName, item) => {
    const folder = folders.find((f) => f.name === folderName);

    if (!folder) {
      const newFolder = { name: folderName, items: [item] };
      try {
        const response = await fetch(`${baseURL}/api/inventory/folders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFolder),
        });
        const data = await response.json();
        setFolders([...folders, data]);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    } else {
      const updatedFolder = { items: [item] };
      try {
        const response = await fetch(`${baseURL}/api/inventory/folders/${folder._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFolder),
        });
        fetchFolders();  // Refresh after update
      } catch (error) {
        console.error('Error updating folder:', error);
      }
    }
  };

  // No changes to deleteFolder, deleteItem, updateQuantity

  return (
    <div>
      <InventoryForm
        addInventoryItem={setFolders}
        folders={folders}
        saveInventoryToFolder={saveInventoryToFolder}
      />
      <InventoryList
        folders={folders}
        deleteFolder={deleteFolder}
        deleteItem={deleteItem}
        updateQuantity={updateQuantity}
      />
    </div>
  );
};

export default InventoryManager;
