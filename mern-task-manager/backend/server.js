// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const taskRoutes = require('./routes/tasks');

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Use task routes for all API calls starting with /api
app.use('/api', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
