import { AiFillCheckCircle } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import '../styles/ConnectionState.scss';

export function ConnectionState({ isConnected }) {
  return (
  <div className='footer' >
    <div className='status'>
      <span>Connection state:</span> { isConnected? <AiFillCheckCircle style={{fill:'green'}}/> : <RxCrossCircled style={{fill:'red'}}/> }
    </div>
  </div>);
}