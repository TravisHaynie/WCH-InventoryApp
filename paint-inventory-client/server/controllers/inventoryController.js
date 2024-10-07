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
    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    items.forEach(itemData => {
      folder.items.push(itemData);
    });

    const updatedFolder = await folder.save();
    res.json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating folder' });
  }
};

// Delete a folder
const deleteFolder = async (req, res) => {
  const { id } = req.params;

  try {
    const folder = await Folder.findById(id);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    await folder.remove();
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting folder' });
  }
};

// Delete an item from a folder
const deleteItem = async (req, res) => {
  const { folderId, itemId } = req.params;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    folder.items = folder.items.filter((item) => item._id.toString() !== itemId);
    await folder.save();
    res.json({ message: 'Item deleted successfully', folder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item quantity in a folder
const updateItemQuantity = async (req, res) => {
  const { folderId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return res.status(404).json({ message: 'Folder not found' });

    const item = folder.items.find((item) => item._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;
    await folder.save();
    res.json({ message: 'Item quantity updated', folder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  deleteItem,
  updateItemQuantity,
};
