const mongoose = require('mongoose');

// Define inventory item schema (since it's part of the log snapshot)
const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Mixed,  // Support both number and string (e.g., '5 gallons')
    required: true,
  },
});

// Define folder snapshot schema (used for logs)
const folderSnapshotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemSchema],  // Array of inventory items
});

// Define log schema for storing snapshots
const logSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  inventory: [folderSnapshotSchema],  // Snapshot of folders and items
});

module.exports = mongoose.model('Log', logSchema);
