import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import '../styles/Map.scss';

export function Map({ locationUpdates }) {
  const leafletRef = useRef([]);

  useEffect(() => {
    leafletRef.current = leafletRef.current.slice(0, locationUpdates.length);
    leafletRef.current.forEach(leaflet => {
      leaflet?.openPopup()
    })
  },[locationUpdates])

  return (
    <MapContainer
      center={{lat: 37.39476, lng: -122.00154}}
      zoom={11.2}
      scrollWheelZoom={false}
      className="mapStyle"
    >
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        {locationUpdates.map((location, id) => (
          <Marker key={location.id} ref={el => leafletRef.current[id] = el} position={location.coordinate || location.origin}>
            <Popup autoClose={false} closeButton={false} closeOnClick={false} >{location.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}