const cron = require('node-cron');
const Log = require('../models/Log');
const Folder = require('../models/Folder'); // Make sure to import Folder model

// Get all logs including today's log if available
const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 }); // Fetch logs sorted by date
    res.json(logs); // Send logs to frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
};


  const saveLogSnapshot = async () => {
    try {
      const folders = await Folder.find();  // Fetch current inventory
      const log = new Log({
        date: new Date(),
        inventory: folders,  // Save the inventory snapshot
      });
      await log.save();
      console.log('Inventory snapshot saved.');
    } catch (error) {
      console.error('Error saving log snapshot:', error.message);
    }
  };
  
  // Schedule cron job to run every day at midnight (00:00)
  cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled log snapshot...');
    saveLogSnapshot();
  });
  

module.exports = { getLogs };
