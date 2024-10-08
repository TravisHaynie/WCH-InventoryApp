import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

const InventoryList = ({ folders, deleteFolder, deleteItem, updateQuantity }) => {
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
                  className="delete-btn" 
                  style={{ marginLeft: '10px' }}>
                  🗑 {/* Trash icon */}
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {folder.items && folder.items.length > 0 ? (
                  folder.items.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center" style={{ color: '#FFA500' }}>
                      <span>{item.item} - Quantity: {item.quantity}</span>
                      <div className="item-actions">
                        {/* Decrement Button */}
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, -1)} 
                          className="decrement-btn"
                        >
                          − {/* Minus sign */}
                        </button>

                        {/* Increment Button */}
                        <button 
                          onClick={() => updateQuantity(folder._id, item._id, 1)} 
                          className="increment-btn"
                        >
                          + {/* Plus sign */}
                        </button>

                        {/* Delete Item Button */}
                        <button 
                          onClick={() => deleteItem(folder._id, item._id)} 
                          className="delete-btn"
                        >
                          🗑 {/* Trash icon */}
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
