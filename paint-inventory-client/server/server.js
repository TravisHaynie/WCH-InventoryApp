// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const inventoryRoutes = require('./routes/inventoryRoutes');
const cors = require('cors');
const path = require('path');
const { saveLogSnapshot } = require('./path/to/logController');



// Load environment variables from .env file
dotenv.config(); // This must be called before accessing environment variables

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use('/api/inventory', inventoryRoutes);
app.use(express.static(path.join(__dirname, '../client/dist')));
// Enable CORS for all origins (You can restrict this to specific origins if needed)
app.use(cors());

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });

  app.get('/api/inventory/snapshot', async (req, res) => {
    try {
      await saveLogSnapshot();
      res.json({ message: 'Log snapshot taken' });
    } catch (error) {
      res.status(500).json({ message: 'Error taking log snapshot' });
    }
  });
  
// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// Call the function to connect to the database
connectDB();

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
