const Log = require('../models/Log');
const Folder = require('../models/Folder'); // Make sure to import Folder model

// Get all logs including today's log if available
const getLogs = async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date
  
      // Fetch logs sorted by date
      let logs = await Log.find().sort({ date: -1 });
  
      // Check if today's log exists
      const todayLogExists = logs.some(log => log.date.toISOString().split('T')[0] === today);
  
      // If no log exists for today, create a new one
      if (!todayLogExists) {
        const todayInventory = await Folder.find({ date: { $gte: new Date(today) } });
        
        if (todayInventory.length > 0) {
          const todayLog = new Log({
            date: new Date(),
            inventory: `Inventory data for ${today}`, // Include today's inventory info
          });
          await todayLog.save();
          logs.unshift(todayLog); // Add today's log to the logs array
        }
      }
  
      res.json(logs); // Send the logs to the frontend
    } catch (error) {
      res.status(500).json({ error: 'Error fetching logs' });
    }
  };
  

module.exports = { getLogs };
