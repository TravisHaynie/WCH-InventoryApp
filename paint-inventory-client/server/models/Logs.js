const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  inventory: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Log', logSchema);
