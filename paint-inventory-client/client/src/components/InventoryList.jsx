import React, { useState } from 'react';

const InventoryList = ({ folders, deleteFolder, deleteItem, updateQuantity }) => {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (folderId, itemId, value) => {
    setInputValues({
      ...inputValues,
      [`${folderId}-${itemId}`]: value,
    });
  };

  const handleSaveQuantity = (folderId, itemId) => {
    const newValue = inputValues[`${folderId}-${itemId}`];
    updateQuantity(folderId, itemId, newValue);
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
                <button 
                  onClick={() => deleteFolder(folder._id)} 
                  className="btn btn-danger btn-sm" 
                  style={{ marginLeft: '10px' }}>
                  <i className="bi bi-trash"></i> Delete Folder
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {folder.items && folder.items.length > 0 ? (
                  folder.items.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center" style={{ color: '#FFA500' }}>
                      <span>{item.item}</span>
                      <div>
                        {/* Text/Number Input for quantity */}
                        <input 
                          type="text" 
                          value={inputValues[`${folder._id}-${item._id}`] || item.quantity} 
                          onChange={(e) => handleInputChange(folder._id, item._id, e.target.value)} 
                          className="form-control form-control-sm" 
                          style={{ width: '100px', display: 'inline-block', marginRight: '10px' }} 
                        />
                        <button 
                          onClick={() => handleSaveQuantity(folder._id, item._id)} 
                          className="btn btn-primary btn-sm" 
                          style={{ marginRight: '5px' }}>
                          Save
                        </button>
                        {/* Delete Item Button */}
                        <button 
                          onClick={() => deleteItem(folder._id, item._id)} 
                          className="btn btn-danger btn-sm">
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item" style={{ color: '#FFA500' }}>No items in this folder</li>
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
