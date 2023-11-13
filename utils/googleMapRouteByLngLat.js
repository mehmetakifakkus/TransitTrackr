import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Route } from '../models/Route.js';
import { generateRandomCoordinates } from './generateRandomCoordinates.js';

dotenv.config({ path: '.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// await Route.deleteMany({});
const count = await Route.countDocuments();

function generateAndStoreDirections(origin, destination, mode = 'driving') {
  const apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
  const params = {
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    mode: mode,
    key: process.env.GOOGLE_MAPS_API_KEY,
  };

  axios.get(apiUrl, { params })
    .then(response => {
      const data = response.data;

      if (data.status === 'OK') {
        const route = data.routes[0];
        const overviewPolyline = route.overview_polyline.points;

        // Decode the overview polyline to get coordinates
        const decodedOverview = decodePolyline(overviewPolyline);
        console.log(`Total number of coordinates on overview: ${decodedOverview.length}`);

        const totalSteps = decodedOverview.length;
        const intermediateSteps = [];
        const stepSize = totalSteps / 20;

        for (let i = stepSize; i < totalSteps; i += stepSize) {
          const location = decodedOverview[Math.floor(i)];
          intermediateSteps.push(location);
          // console.log(`Step ${intermediateSteps.length}:`, location);
        }
        Route.create({
          origin,
          destination,
          steps: intermediateSteps,
          name: "Route " + Number(count + 1),
        });
        console.log(`Route ${count + 1} created`);
      } else {
        console.error(`Error: ${data.status} - ${data.error_message}`);
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

// Function to decode Google Maps Polyline
function decodePolyline(encoded) {
  let points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}

let origin = generateRandomCoordinates();
let destination = generateRandomCoordinates();

generateAndStoreDirections(origin, destination);