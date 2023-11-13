// Function to generate random coordinates in San Jose, California
export const generateRandomCoordinates = () => {

  // San Jose approximate bounds
  const latMin = 37.2245;
  const latMax = 37.5085;
  const lngMin = -122.2354;
  const lngMax = -121.7291;

  const lat = Math.random() * (latMax - latMin) + latMin;
  const lng = Math.random() * (lngMax - lngMin) + lngMin;

  return { lat, lng };
};
