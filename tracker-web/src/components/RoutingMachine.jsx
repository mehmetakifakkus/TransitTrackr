import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

// styles
import "../styles/RoutingMachine.scss";

const createRoutineMachineLayer = ({steps}) => {
  const instance = L.Routing.control({
    waypoints: steps.map(step => L.latLng(step.lat, step.lng)),
    lineOptions: {
      styles: [{ color: "#619efb", weight: 4 }],
      addWaypoints: false,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    createMarker: () => {},
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
