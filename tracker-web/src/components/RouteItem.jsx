import { Button, Progress } from 'antd';
import React, { memo } from 'react'

import {FaPlay} from 'react-icons/fa'
import {MdOutlineReplay} from 'react-icons/md'

function RouteItem({route, socket}) {
  return (
    <div key={route.id} className='routeItem'>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <span style={{width:'100px'}}>{route.name}</span>
      <Button disabled={route.percentage < 100} shape={"default"} size={"middle"} icon ={route.percentage>= 100? <MdOutlineReplay/>: <FaPlay />} onClick={()=>{
        socket.emit("startTravelById", route.id);
      }}>  
        {route.percentage >= 100 ? " Start Over" : " Start"}
      </Button>
      </div>
      <Progress percent={Number(route.percentage)} status={route.percentage < 100 ? "active" : "success"} />
    </div>
  )
}

function routePropsAreEqual(prev, next) {
  return prev.route.percentage === next.route.percentage;
}

export default memo(RouteItem, routePropsAreEqual)