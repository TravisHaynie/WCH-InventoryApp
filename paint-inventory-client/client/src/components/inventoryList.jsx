import React from 'react';

const InventoryList = ({ folders }) => {
  return (
    <div className="card" style={{ backgroundColor: '#333333', border: '1px solid #e0e0e0', padding: '10px', borderRadius: '8px' }}>
        <h2 className="mb-4" style={{ color: '#FFA500' }}>Folders</h2> {/* Orange text */}
        {folders.length > 0 ? (
            folders.map((folder) => (
                <div key={folder._id} className="card mb-3" style={{ backgroundColor: '#444444', color: '#FFA500' }}> {/* Darker background for folder cards */}
                    <div className="card-body">
                        <h5 className="card-title" style={{ color: '#FFA500' }}>{folder.name}</h5> {/* Orange text */}
                        <ul className="list-group list-group-flush">
                            {folder.items && folder.items.length > 0 ? (
                                folder.items.map((item) => (
                                    <li key={item._id} className="list-group-item" style={{ color: '#FFA500' }}> {/* Orange text */}
                                        {item.item} - Quantity: {item.quantity}
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
