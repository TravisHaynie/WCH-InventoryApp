const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true, // Ensure item is required
  },
  quantity: {
    type: Number,
    required: true, // Ensure quantity is required
  },
});

module.exports = mongoose.model('Inventory', inventorySchema);
