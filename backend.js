// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your route schema
// const Route = require('./models/Route');

// Initialize the express application
const app = express();

// Enable CORS with various options
app.use(cors());

// Body parser middleware
app.use(express.json());

// Initialize HTTP Server for Socket.IO
const server = http.createServer(app);

// Initialize socket.io on the server
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the RESTful API routes
app.get('/api/routes', (req, res) => {
  Route.find()
    .then(routes => res.json(routes))
    .catch(err => res.status(404).json({ noroutesfound: 'No routes found' }));
});

app.get('/api/routes/:id', (req, res) => {
  Route.findById(req.params.id)
    .then(route => res.json(route))
    .catch(err => res.status(404).json({ noroutefound: 'No route found with that ID' }));
});

// Function to generate random coordinates in San Jose, California
const generateRandomCoordinates = () => {
  // San Jose approximate bounds
  const latMin = 37.1245;
  const latMax = 37.5485;
  const lngMin = -122.2654;
  const lngMax = -121.5891;

  const lat = Math.random() * (latMax - latMin) + latMin;
  const lng = Math.random() * (lngMax - lngMin) + lngMin;
  
  return { lat, lng };
};

// WebSocket connection logic
io.on('connection', (socket) => {
  console.log('New client connected');

  const sendLocationUpdate = () => {
    const locationData = {
      routeId: '12345',  // Example route ID
      coordinates: generateRandomCoordinates() // Generates random coordinates in San Jose
    };
    socket.emit('locationUpdate', locationData);
  };

  const locationUpdateInterval = setInterval(sendLocationUpdate, 10000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(locationUpdateInterval);
  });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Run the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
