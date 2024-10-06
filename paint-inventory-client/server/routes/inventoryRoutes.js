// /server/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getFolders,
  createFolder,
  updateFolder,
} = require('../controllers/inventoryController');

// GET all folders
router.get('/folders', getFolders);

// POST a new folder with inventory items
router.post('/folders', createFolder);

// PUT (update) an existing folder by adding more inventory items
router.put('/folders/:id', updateFolder);

module.exports = router;
