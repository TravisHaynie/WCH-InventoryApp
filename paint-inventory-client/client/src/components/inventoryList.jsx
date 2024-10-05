import React from 'react';

const InventoryList = ({ inventory }) => {
  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.item} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
