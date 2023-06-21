import { Box, Typography, TextField, Button } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { withStyles } from '@mui/styles';
import React, { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                color: 'white'
            },
        },
        '& label': {
            color: 'white',
        }
    },
})(TextField);

const MuiJoinRoom = ({ socket }) => {
    const { username, roomCode, setUsername, setRoomCode } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleJoinRoom = () => {
        if (username.length <= 0 || roomCode.length <= 0) {
            toast.error("please fill the required field");
        } else {
            socket.emit('join_room', { roomCode, username });
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('roomCode', roomCode);
            navigate('/chat');
        }
    }

    useEffect(() => {
        if(sessionStorage.getItem('username')){
            navigate('/chat');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messenger | Join Room</title>
            </Helmet>
            <Box
                height='100vh'
                display="flex"
                flexDirection="column"
                alignItems="center"                
                justifyContent="center"
                overflow="hidden"
                sx={{
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    padding={'2rem'}
                    alignItems="center"
                    maxWidth={{ xs: '15rem', sm: '8rem', lg: '30rem', md: '25rem' }}
                    minWidth={{ lg: '29rem', md: '24rem'}}
                    justifyContent="center"
                    color={'white'}
                    marginX='1rem'
                    border="1px solid white"
                    boxShadow="1px 0px 15px #8080ff"
                    borderRadius={'2rem'}
                >
                    <Typography variant="h4" align="center" gutterBottom color={'white'} sx={{
                        fontWeight: 'bolder'
                    }}>
                        Join Room
                    </Typography>
                    <CustomTextField
                        label="Name"
                        variant="outlined"
                        size='small'
                        color='third'
                        fullWidth
                        required
                        inputProps={{
                            style: { color: 'white' }
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                    />
                    <CustomTextField
                        label="Room Code"
                        variant="outlined"
                        required
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        size='small'
                        fullWidth
                        color='third'
                        inputProps={{
                            style: { color: 'white' }
                        }}
                        margin="normal"
                    />
                    <Box paddingTop={'2rem'}>
                        <Button variant="contained" color="primary" size='large' endIcon={<HandshakeIcon />} onClick={handleJoinRoom}>Join</Button>
                    </Box>
                </Box>
            </Box>
            <ToastContainer />
        </>
    )
}

export default MuiJoinRoom;