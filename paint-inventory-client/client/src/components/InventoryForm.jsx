import React, { useState } from 'react';

const InventoryForm = ({ addInventoryItem, folders = [], saveInventoryToFolder }) => {
  const [item, setItem] = useState(''); // State for item name
  const [quantity, setQuantity] = useState(''); // State for quantity
  const [selectedFolder, setSelectedFolder] = useState(''); // For selecting an existing folder
  const [newFolderName, setNewFolderName] = useState(''); // For creating a new folder

  // Handle form submission to add inventory item
// Handle form submission to add inventory item
const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!item || !quantity) {
      alert('Please enter both item and quantity');
      return;
    }
  
    // Check if the user has selected or created a folder
    if (!selectedFolder && !newFolderName) {
      alert('Please select a folder or create a new one');
      return;
    }
  
    const folderName = newFolderName || selectedFolder;
  
    // Create new item object
    const newItem = { item, quantity };
    
    addInventoryItem(newItem); // Add the new item locally (optional if you want to display locally)
  
    // Pass both folderName and newItem to saveInventoryToFolder
    saveInventoryToFolder(folderName, newItem);  // Save item to the appropriate folder
    
    // Reset form fields after submission
    setItem('');
    setQuantity('');
    setNewFolderName('');
    setSelectedFolder('');
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <div>
          <label>Select Folder:</label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option value="">Select a folder</option>
            {folders.map((folder, index) => (
              <option key={index} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Create New Folder:</label>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Enter new folder name"
          />
        </div>

        <button type="submit">Add Inventory</button>
      </form>
    </div>
  );
};

export default InventoryForm;
