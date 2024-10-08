import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

const InventoryList = ({ folders, deleteFolder, deleteItem, updateQuantity }) => {

  // Function to download folder data as JSON
  const handleDownloadFolder = (folder) => {
    const folderData = {
      name: folder.name,
      items: folder.items.map(item => ({
        item: item.item,
        quantity: item.quantity
      }))
    };

    const blob = new Blob([JSON.stringify(folderData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${folder.name}.json`; // File name with folder name
    link.click();
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
      <h2 className="mb-4" style={{ color: '#FFA500' }}>Folders</h2> {/* Orange text */}
      {folders.length > 0 ? (
        folders.map((folder) => (
          <div key={folder._id} className="card mb-3" style={{ backgroundColor: '#444444', color: '#FFA500' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title" style={{ color: '#FFA500' }}>{folder.name}</h5>
                {/* Delete Folder Button */}
                <div>
                  <button 
                    onClick={() => handleDownloadFolder(folder)} 
                    className="btn btn-info btn-sm"
                    style={{ marginRight: '10px' }}>
                    <i className="bi bi-download"></i> Download Folder
                  </button>
                  <button 
                    onClick={() => handleDeleteFolder(folder._id)} 
                    className="delete-btn btn btn-danger btn-sm">
                    <i className="bi bi-trash"></i> Delete Folder
                  </button>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                {folder.items && folder.items.length > 0 ? (
                  folder.items.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center" style={{ color: 'black' }}>
                      <span>{item.item} - Quantity: {item.quantity}</span>
                      <div>
                        {/* Buttons to adjust quantity */}
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, -1)} 
                          className="increment-btn btn btn-warning btn-sm"
                          style={{ marginRight: '5px' }}>
                          <i className="bi bi-dash-circle"></i>
                        </button>
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, 1)} 
                          className="increment-btn btn btn-success btn-sm"
                          style={{ marginRight: '5px' }}>
                          <i className="bi bi-plus-circle"></i>
                        </button>
                        {/* Delete Item Button with Confirmation */}
                        <button 
                          onClick={() => handleDeleteItem(folder._id, item._id)} 
                          className="delete-btn btn btn-danger btn-sm">
                          <i className="bi bi-trash"></i> Delete
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
