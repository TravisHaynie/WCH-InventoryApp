// /server/controllers/inventoryController.js
const Folder = require('../models/Folder');
const Inventory = require('../models/inventoryModel'); // Updated to use inventoryModel

// Get all folders
const getFolders = async (req, res) => {
    try {
      const folders = await Folder.find().populate('items'); // Ensure items are populated
      res.json(folders);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Create a new folder with inventory items
// Create a new folder with inventory items
const createFolder = async (req, res) => {
    const { name, items } = req.body;
  
    try {
      if (!name) {
        return res.status(400).json({ message: 'Folder name is required' });
      }
  
      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No inventory items provided' });
      }
  
      // Create inventory items and store their ObjectId references
      const inventoryIds = await Promise.all(
        items.map(async (itemData) => {
          const newItem = new Inventory(itemData); // Save inventory item
          const savedItem = await newItem.save();  // Save to DB and get _id
          return savedItem._id;                    // Return ObjectId for reference
        })
      );
  
      // Create the folder with the inventory item IDs
      const newFolder = new Folder({ name, items: inventoryIds });
      const savedFolder = await newFolder.save();
  
      res.status(201).json(savedFolder); // Return the newly created folder
    } catch (error) {
      console.error('Error creating folder:', error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
  
  // Add inventory to an existing folder
  const updateFolder = async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;
  
    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No inventory items provided' });
      }
  
      // Create and store new inventory items, get their ObjectIds
      const inventoryIds = await Promise.all(
        items.map(async (itemData) => {
          const newItem = new Inventory(itemData);
          const savedItem = await newItem.save();
          return savedItem._id;
        })
      );
  
      // Find the folder by id and push the new inventory ObjectIds into it
      const folder = await Folder.findById(id);
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
  
      folder.items.push(...inventoryIds);
      const updatedFolder = await folder.save();
  
      res.json(updatedFolder);
    } catch (error) {
      console.error('Error updating folder:', error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
  
  
  
module.exports = {
  getFolders,
  createFolder,
  updateFolder,
};
