import React from 'react'
import { Button } from 'antd';

// components
import RouteItem from './RouteItem';

// styles
import {FaPlay} from 'react-icons/fa'
import {MdOutlineReplay} from 'react-icons/md'
import '../styles/RouteList.scss'

function RouteList({socket, locationUpdates}) {

  const allRoutesAreInitialState = locationUpdates?.every(route => route.percentage === 0);

  return (
    <div className='leftPane'>
      <Button shape={"default"} size={"middle"} icon={allRoutesAreInitialState ? <FaPlay /> : <MdOutlineReplay/>} onClick={()=>{
        socket.emit("startTravel");
      }}>
        {allRoutesAreInitialState ? "Start All" : "Restart All"}
      </Button>
      <div className='routeListContainer'>
        {locationUpdates?.map((route) => <RouteItem key={route.id} route={route} socket={socket} />)}
      </div>
    </div>
  )
}

export default RouteList