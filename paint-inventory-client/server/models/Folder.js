// const mongoose = require('mongoose');

// // Define inventory item schema
// const itemSchema = new mongoose.Schema({
//   item: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: mongoose.Schema.Types.Mixed,
//     required: true,
//   },
// });

// // Define folder schema
// const folderSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   items: [itemSchema],
//   date: { type: Date, default: Date.now }  // Array of inventory items
// });

// module.exports = mongoose.model('Folder', folderSchema);

const mongoose = require('mongoose');

// Define inventory item schema
const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,  // Automatically set this to the current time when an item is updated
  },
});

// Define folder schema
const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [itemSchema],  // Array of inventory items
  date: {
    type: Date,
    default: Date.now,  // Automatically set this to the current time when the folder is created or updated
  },
});

module.exports = mongoose.model('Folder', folderSchema);

