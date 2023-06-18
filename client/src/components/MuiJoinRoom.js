import { Box, Typography, TextField, Button } from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import React, { useState } from 'react';

const MuiJoinRoom = ({socket}) => {
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const handleJoinRoom = ()=>{
        console.log(username, "username");
        console.log(roomCode, "roomCode");
    }
    return (
        <Box
            height='100vh'
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
        >
            <Box
                display="flex"
                flexDirection="column"
                padding={'2rem'}
                alignItems="center"
                justifyContent="center"
                border="1px solid black"
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Join Room
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    size='small'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Room Code"
                    variant="outlined"
                    value={roomCode}
                    onChange={(e)=> setRoomCode(e.target.value)}
                    size='small'
                    margin="normal"
                />
            <Box paddingTop={'1rem'}>
            <Button variant="contained" color="primary" endIcon={<HandshakeIcon />} onClick={handleJoinRoom}>Join</Button>
            </Box>
            </Box>
        </Box>
    )
}

export default MuiJoinRoom