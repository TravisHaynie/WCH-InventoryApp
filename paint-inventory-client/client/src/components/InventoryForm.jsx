import React, { useState } from 'react';

const InventoryForm = ({ addInventoryItem, folders = [], saveInventoryToFolder }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    const [newFolderName, setNewFolderName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!item || !quantity) {
            alert('Please enter both item and quantity');
            return;
        }

        if (!selectedFolder && !newFolderName) {
            alert('Please select a folder or create a new one');
            return;
        }

        const newItem = { item, quantity };
        const folderName = newFolderName || selectedFolder;

        console.log('Adding item:', newItem, 'to folder:', folderName);

        saveInventoryToFolder(folderName, newItem); // Pass newItem to saveInventoryToFolder

        // Reset form fields
        setItem('');
        setQuantity('');
        setNewFolderName('');
        setSelectedFolder('');
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title">Add Inventory</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Item Name:</label>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            className="form-control"
                            placeholder="Enter item name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="form-control"
                            placeholder="Enter quantity"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Folder:</label>
                        <select
                            value={selectedFolder}
                            onChange={(e) => setSelectedFolder(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select a folder</option>
                            {folders.map((folder) => (
                                <option key={folder._id} value={folder.name}>
                                    {folder.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Or Create New Folder:</label>
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="form-control"
                            placeholder="Enter new folder name"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Inventory
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InventoryForm; // Ensure this line exists
