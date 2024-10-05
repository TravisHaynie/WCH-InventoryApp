import React, { useState } from 'react';

const InventoryForm = ({ setInventory }) => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item, quantity }),
    })
      .then((response) => response.json())
      .then((newItem) => setInventory((prev) => [...prev, newItem]));

    setItem('');
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
