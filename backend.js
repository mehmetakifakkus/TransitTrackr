// For the candidate, this is a sample backend written in Node.js for a real-time backend that emits the location of vehicles on a route over WebSockets. Feel free to change the sendLocationUpdates to your liking. 
// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

// Import your route and user schemas
// const Route = require('./models/Route');
// const User = require('./models/User');

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

// Passport middleware for authentication
app.use(passport.initialize());
require('./config/passport')(passport); // Import and configure passport strategies

// Define the RESTful API routes
app.get('/api/routes', (req, res) => {
  // Route.find() will fetch all the route data from your MongoDB
  // Assuming you have a Route model already set up
  Route.find()
    .then(routes => res.json(routes))
    .catch(err => res.status(404).json({ noroutesfound: 'No routes found' }));
});

app.get('/api/routes/:id', (req, res) => {
  Route.findById(req.params.id)
    .then(route => res.json(route))
    .catch(err => res.status(404).json({ noroutefound: 'No route found with that ID' }));
});

// Authentication Routes would go here
// ...

// WebSocket connection logic
io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit real-time updates for a specific route
  // You would replace this with your actual real-time update logic
  const sendLocationUpdate = () => {
    const fakeLocationData = {
      routeId: '12345',
      coordinates: { lat: 40.7128, lng: -74.0060 } // Replace with real data
    };
    socket.emit('locationUpdate', fakeLocationData);
  };

  // Call sendLocationUpdate at your chosen interval
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
