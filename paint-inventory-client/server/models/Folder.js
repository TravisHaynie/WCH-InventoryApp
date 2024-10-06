const mongoose = require('mongoose');

// Define an inventory item schema
const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Define the folder schema
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [itemSchema], // Each folder can have an array of inventory items
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
