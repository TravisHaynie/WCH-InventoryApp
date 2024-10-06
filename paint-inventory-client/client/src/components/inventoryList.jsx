import React from 'react';

const InventoryList = ({ folders }) => {
  return (
    <div>
        <h2>Folders</h2>
        {folders.length > 0 ? (
            folders.map((folder) => (
                <div key={folder._id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{folder.name}</h5>
                        <ul className="list-group">
                            {folder.items && folder.items.length > 0 ? (
                                folder.items.map((item) => (
                                    <li key={item._id} className="list-group-item">
                                        {item.item} - Quantity: {item.quantity}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item">No items in this folder</li>
                            )}
                        </ul>
                    </div>
                </div>
            ))
        ) : (
            <p>No folders available</p>
        )}
    </div>
);
};


export default InventoryList;
