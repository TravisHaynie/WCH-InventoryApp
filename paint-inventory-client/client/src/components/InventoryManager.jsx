import React, { useState, useEffect } from 'react';
import InventoryForm from './InventoryForm';
import InventoryList from './InventoryList';

const baseURL = import.meta.env.VITE_API_URL || 'https://wch-inventoryapp.onrender.com';

const InventoryManager = () => {
  const [folders, setFolders] = useState([]);

  const fetchFolders = async () => {
    try {
      const response = await fetch(`${baseURL}/api/inventory/folders`);
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

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
        fetchFolders(); // Refresh after update
      } catch (error) {
        console.error('Error updating folder:', error);
      }
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`${baseURL}/api/inventory/folders/${folderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFolders(folders.filter((folder) => folder._id !== folderId)); // Remove folder from the UI
      } else {
        console.error('Failed to delete folder');
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };
  

  const deleteItem = async (folderId, itemId) => {
    try {
      const response = await fetch(`${baseURL}/api/inventory/folders/${folderId}/items/${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchFolders(); // Refresh after deletion
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateQuantity = async (folderId, itemId, delta) => {
    try {
      const folder = folders.find((f) => f._id === folderId);
      const item = folder.items.find((i) => i._id === itemId);
  
      // Extract numeric portion from quantity
      const numericPart = parseFloat(item.quantity) || 0;
      const textPart = item.quantity.replace(numericPart, '').trim(); // Text after numeric
  
      // Increment or decrement the numeric portion
      const updatedNumeric = numericPart + delta;
      if (updatedNumeric < 0) return; // Prevent negative values
  
      const updatedQuantity = `${updatedNumeric} ${textPart}`; // Combine updated number and text
  
      const updatedItem = { ...item, quantity: updatedQuantity };
  
      const response = await fetch(`${baseURL}/api/inventory/folders/${folderId}/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
  
      if (response.ok) {
        fetchFolders(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  

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
