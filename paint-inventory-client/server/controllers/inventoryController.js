const Inventory = require('../models/inventoryModel');

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not retrieve inventory' });
  }
};

// Add a new inventory item
const addInventoryItem = async (req, res) => {
  const { item, quantity } = req.body;

  if (!item || !quantity) {
    return res.status(400).json({ message: 'Please provide both item and quantity' });
  }

  try {
    const newItem = new Inventory({ item, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not add item' });
  }
};

// Delete an inventory item
const deleteInventoryItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.remove();
    res.status(200).json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not remove item' });
  }
};

module.exports = {
  getInventory,
  addInventoryItem,
  deleteInventoryItem,
};
