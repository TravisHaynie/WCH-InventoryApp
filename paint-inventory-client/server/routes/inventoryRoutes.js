const express = require('express');
const router = express.Router();
const {
  getInventory,
  addInventoryItem,
  deleteInventoryItem,
} = require('../controllers/inventoryController');

// GET all inventory items
router.get('/', getInventory);

// POST a new inventory item
router.post('/', addInventoryItem);

// DELETE an inventory item by ID
router.delete('/:id', deleteInventoryItem);

module.exports = router;
