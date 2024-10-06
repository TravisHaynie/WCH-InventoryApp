const Folder = require('../models/Folder');

// Get all folders and populate items
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().populate('items');
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error.message);
    res.status(500).json({ message: 'Server error fetching folders' });
  }
};

// Create a new folder and save items
const createFolder = async (req, res) => {
    const { name, items } = req.body;
  
    try {
      if (!name) {
        return res.status(400).json({ message: 'Folder name is required' });
      }
  
      const newFolder = new Folder({ name, items });
      const savedFolder = await newFolder.save();
      res.status(201).json(savedFolder);
    } catch (error) {
      console.error('Error creating folder:', error.message);
      res.status(500).json({ message: 'Server error creating folder' });
    }
  };
  

// Update folder by adding new items
const updateFolder = async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;
  
    try {
      // Log the incoming items
      console.log('Updating folder with ID:', id, 'with items:', items);
  
      // Validate items array
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is required and cannot be empty' });
      }
  
      // Find the folder by ID
      const folder = await Folder.findById(id);
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
  
      // Append new items directly to the folder's items array
      items.forEach(itemData => {
        // Push each item to the folder's items array
        folder.items.push(itemData);
      });
  
      // Save the updated folder
      const updatedFolder = await folder.save();
      console.log('Folder updated successfully:', updatedFolder);
      
      res.json(updatedFolder);
    } catch (error) {
      console.error('Error updating folder:', error.message); // Log the error message
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
  
  

module.exports = {
  getFolders,
  createFolder,
  updateFolder,
};
