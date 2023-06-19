import { io } from 'socket.io-client';
import { createTheme, ThemeProvider } from '@mui/material';
import MuiJoinRoom from './components/MuiJoinRoom';
import MuiChat from './components/MuiChat';
import './App.css';

const socket = io('http://localhost:5000');

const theme = createTheme({
  palette: {
    third: {
      main: '#ffffff'
    }
  }
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <MuiJoinRoom socket={socket} /> */}
        <MuiChat />
      </ThemeProvider>
    </>
  );
};

export default App;
