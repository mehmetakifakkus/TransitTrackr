import React, { useEffect, useState } from 'react'
import { Map } from './Map'
import '../styles/MainComponent.scss'
import RouteList from './RouteList';
import axios from 'axios';

function MainComponent({socket}) {
  const [routes, setRoutes] = useState([]);
  const [locationUpdates, setLocationUpdates] = useState([]);

  useEffect(()=>{
    axios.get("https://localhost:443/api/routes")
    .then(response => {
      setRoutes(response.data);
      setLocationUpdates(response.data);
    }).catch(err => {
      console.error('Error while fetching routes!');
    })
  }, []);
  
  useEffect(() => {
    socket?.on("locationUpdate", (updates) => {
      const merged = updates.map(update => {
        const route = routes?.find(route => route.id.includes(update.id));
        return {
          ...update, 
          origin: route?.origin,
        }
      })
      setLocationUpdates(merged);
    })
  }, [socket, routes]);

  return (
    <div className='main'>
      <RouteList socket={socket} routes={routes} locationUpdates={locationUpdates}  />
      <Map routes={routes} locationUpdates={locationUpdates}/>
    </div>
  )
}

export default MainComponent