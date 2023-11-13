import './App.scss';
import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { ConnectionState } from './components/ConnectionState';
import MainComponent from './components/MainComponent';
import Navbar from './components/Navbar';

function App() {
  // check connection status
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = socketIO.connect('http://localhost:5001');
    setSocket(socket);

    socket.on('connect', () => {
      setIsConnected(socket.connected)
    })

    return () => {
      socket.disconnect();
    }
  }, [])


  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <MainComponent socket={socket} />
        <ConnectionState isConnected={isConnected} />
      </header>
    </div>
  );
}

export default App;
