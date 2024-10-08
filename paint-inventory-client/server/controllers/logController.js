const Log = require('../models/Log');

// Get all logs including today's log if available
const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ date: -1 }); // Get logs sorted by date

    // Check if today's log exists
    const today = new Date().toISOString().split('T')[0];
    const todayLog = logs.find(log => log.date.toISOString().split('T')[0] === today);

    if (!todayLog) {
      // If today's log doesn't exist, fetch today's inventory and create a log
      const todayInventory = await Folder.find({ date: { $gte: today } });
      if (todayInventory.length > 0) {
        const newLog = {
          date: today,
          inventory: `Inventory for ${today}`,
        };
        logs.unshift(newLog); // Add today's log to the beginning of the logs array
      }
    }

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logs' });
  }
};

module.exports = { getLogs };
