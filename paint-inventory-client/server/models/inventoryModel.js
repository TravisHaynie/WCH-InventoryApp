const mongoose = require('mongoose');

// Define inventory item schema
const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Mixed, // Allows both number and string
    required: true,
  },
});

// Define folder schema
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [itemSchema], // Array of inventory items
});

module.exports = mongoose.model('Folder', folderSchema);
