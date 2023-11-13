import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    origin: { lat: Number, lng: Number },
    destination: { lat: Number, lng: Number },
    id: String,
    steps: [{ lat: Number, lng: Number }],
    name: String,
    size: String
  }
);

const Route = mongoose.model('Route', schema);
export { Route };
