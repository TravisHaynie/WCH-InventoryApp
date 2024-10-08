const express = require('express');
const router = express.Router();
const {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  deleteItem,
  updateItemQuantity,
} = require('../controllers/inventoryController');
const { getLogs } = require('../controllers/logController'); // Add logController

// Logs route
router.get('/logs', getLogs); // Add this route to fetch logs

// GET all folders
router.get('/folders', getFolders);

// POST a new folder with inventory items
router.post('/folders', createFolder);

// PUT (update) an existing folder by adding more inventory items
router.put('/folders/:id', updateFolder);
router.delete('/folders/:id', deleteFolder);

// Add routes for item deletion and updating
router.delete('/folders/:folderId/items/:itemId', deleteItem);
router.put('/folders/:folderId/items/:itemId', updateItemQuantity);

module.exports = router;
