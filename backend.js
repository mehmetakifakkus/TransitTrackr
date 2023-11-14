// Import necessary modules
import express from 'express';
import http from 'http';
import { Server as socketIO } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import environment variables
dotenv.config({ path: '.env' });

// Import your route schema
import { Route } from './models/Route.js';

// Initialize the express application
const app = express();

// Enable CORS with various options
app.use(cors());

var allowedOrigins = [
  'http://localhost:3000',
  'http://mytrackerapp.com'];

// Body parser middleware
app.use(express.json());

// Initialize HTTP Server for Socket.IO
const server = http.createServer(app);

// Initialize socket.io on the server
const io = new socketIO(server, { cors: { origin: allowedOrigins } });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the RESTful API routes
app.get('/api/routes', (req, res) => {
  Route.find()
    .then(routes =>
      res.json(routes.map(route => {
        return {
          id: route._id.toString(),
          name: route.name,
          percentage: 0,
          origin: route.origin,
          destination: route.destination
        }
      }))
    )
    .catch(err => res.status(404).json({ noroutesfound: 'No routes found' }));
});

app.get('/api/routes/:id', (req, res) => {
  Route.findById(req.params.id)
    .then(route => res.json(route))
    .catch(err => res.status(404).json({ noroutefound: 'No route found with that ID' }));
});

// WebSocket connection logic
io.on('connection', async (socket) => {
  console.log('New client connected');
  let allDone = false;

  // fetch all routes from the database
  const routes = await Route.find();

  let currentLocations = routes.map(route => {
    return {
      id: route._id.toString(),
      name: route.name,
      currentStep: 0,
    }
  })

  const sendLocationUpdate = () => {
    currentLocations = currentLocations.map((loc, id) => {
      const route = routes[id];
      return {
        ...loc,
        coordinate: (loc.currentStep + 1) < route.steps.length ? route.steps[loc.currentStep + 1] : route.destination,
        currentStep: loc.currentStep + 1,
        percentage: Math.round(100 * (loc.currentStep + 1) / routes[id].steps.length)
      }
    })

    allDone = currentLocations.every(loc => loc.percentage >= 100);

    // if all vehicles are done with their route, stop sending location updates
    if (allDone) clearInterval(locationUpdateInterval);
    socket.emit('locationUpdate', currentLocations);
  };

  // time interval for location update
  let locationUpdateInterval = null;

  // start travel by setting currentStep values of all to 0
  socket.on("startTravel", () => {
    currentLocations.forEach(location => { location.currentStep = -1 });

    if (allDone || locationUpdateInterval === null) // start sending location updates if all vehicles are done
      locationUpdateInterval = setInterval(sendLocationUpdate, 1000);
  })

  // start travel by setting value of location with specified id to 0
  socket.on("startTravelById", id => {
    console.log('start travel by id:', id)
    let route = currentLocations.find(location => location.id === id)

    if (route) {
      route.currentStep = -1;

      if (allDone || locationUpdateInterval === null) // start sending location updates if all vehicles are done
        locationUpdateInterval = setInterval(sendLocationUpdate, 1000);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(locationUpdateInterval);
  });
});

// Define the PORT
const PORT = process.env.PORT || 5001;

// Run the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
