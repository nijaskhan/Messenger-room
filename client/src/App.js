import './App.css';
import { io } from 'socket.io-client';
import MuiJoinRoom from './components/MuiJoinRoom';

const socket = io('http://localhost:5000');

const App = () => {
  return (
    <>
      <MuiJoinRoom socket={socket} />
    </>
  );
};

export default App;
