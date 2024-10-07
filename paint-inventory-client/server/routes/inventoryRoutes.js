// /server/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder, // Add deleteFolder controller if not done yet
  deleteItem, // New controller for deleting an item
  updateItemQuantity, 
} = require('../controllers/inventoryController');

// GET all folders
router.get('/folders', getFolders);

// POST a new folder with inventory items
router.post('/folders', createFolder);

// PUT (update) an existing folder by adding more inventory items
router.put('/folders/:id', updateFolder);
router.delete('/folders/:id', deleteFolder); // Deleting a folder

// Add routes for item deletion and updating
router.delete('/folders/:folderId/items/:itemId', deleteItem); // Deleting an item
router.put('/folders/:folderId/items/:itemId', updateItemQuantity)

module.exports = router;
