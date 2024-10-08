import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import { jsPDF } from "jspdf"; // Import jsPDF

const InventoryList = ({ folders, deleteFolder, deleteItem, updateQuantity }) => {

  // Function to download folder data as PDF
  const handleDownloadFolder = (folder) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Folder Name: " + folder.name, 10, 10);

    doc.setFontSize(12);
    folder.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.item} - Quantity: ${item.quantity}`, 10, 20 + (index * 10));
    });

    doc.save(`${folder.name}.pdf`); // Save as PDF file
  };

  const handleDeleteItem = (folderId, itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(folderId, itemId);
    }
  };

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      deleteFolder(folderId);
    }
  };

  return (
    <div className="card" style={{ backgroundColor: '#333333', border: '1px solid #e0e0e0', padding: '10px', borderRadius: '8px' }}>
      <h2 className="mb-4" style={{ color: '#FFA500' }}>Folders</h2>
      {folders.length > 0 ? (
        folders.map((folder) => (
          <div key={folder._id} className="card mb-3" style={{ backgroundColor: '#444444', color: '#FFA500' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center folder-header">
                <h5 className="folder-title" style={{ color: '#FFA500', flexGrow: 1 }}>{folder.name}</h5> {/* Folder title */} 
                <div className="folder-actions">
                  <button 
                    onClick={() => handleDownloadFolder(folder)} 
                    className="btn btn-danger btn-sm" // Match size with Del button
                    style={{ marginRight: '5px' }}>
                    PDF
                  </button>
                  <button 
                    onClick={() => handleDeleteFolder(folder._id)} 
                    className="delete-btn btn btn-danger btn-sm">
                    Del
                  </button>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                {folder.items && folder.items.length > 0 ? (
                  folder.items.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center" style={{ color: 'black' }}>
                      <span>{item.item} - Quantity: {item.quantity}</span>
                      <div className="d-flex align-items-center item-actions">
                        {/* Buttons to adjust quantity */}
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, -1)} 
                          className="increment-btn btn btn-link btn-sm"
                          style={{ marginRight: '5px' }}>
                          -
                        </button>
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, 1)} 
                          className="increment-btn btn btn-link btn-sm"
                          style={{ marginRight: '5px' }}>
                          +
                        </button>
                        {/* Fix Delete Item Button */}
                        <button 
                          onClick={() => handleDeleteItem(folder._id, item._id)} 
                          className="delete-btn btn btn-danger btn-sm delete-item-btn"
                          style={{ padding: '5px 8px' }}>
                          <i className="bi bi-trash"></i> {/* Add trashcan icon */}
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item" style={{ color: 'black' }}>No items in this folder</li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: '#FFA500' }}>No folders available</p>
      )}
    </div>
  );
};

export default InventoryList;
