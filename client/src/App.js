import { io } from 'socket.io-client';
import { createTheme, ThemeProvider } from '@mui/material';
import MuiJoinRoom from './components/MuiJoinRoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import './App.css';

const socket = io('http://localhost:5000');

const theme = createTheme({
  palette: {
    third: {
      main: '#ffffff'
    },
    black: {
      main: '#000000'
    }
  }
});

const App = () => {
  const MuiChat = lazy(() => import('./components/MuiChat'));
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<MuiJoinRoom socket={socket} />} />
            <Route
              path='/chat'
              element={
                <Suspense fallback={<Loading />}>
                  <MuiChat socket={socket} />
                </Suspense>
              } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
