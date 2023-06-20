import { Box, Container, Typography, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MuiMessages from './MuiMessages';
import './styles/chat.css';
import MuiMessageInp from './MuiMessageInp';
import { useNavigate } from 'react-router-dom';

const MuiChat = ({socket}) => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('username')){
            navigate('/');
        }
    });
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messenger | Home</title>
            </Helmet>
            {/* 
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color={'#fffff'} sx={{ fontWeight: 'bolder' }}>Room Messenger</Typography>
                </Toolbar>
            </AppBar> 
            */}
            <Box component={Container} height={'100vh'} justifyContent={'center'} sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Grid container spacing={2} justifyContent={'center'} height={'87vh'} sx={{
                    border: '1px solid black',
                    borderRadius: '2rem',
                    padding: '2rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    // backgroundColor: 'white',
                    boxShadow: "1px 0px 15px ##1a1a1af"
                }}>

                    {/* CHAT-SIDEBAR */}
                    <Grid item md={4} lg={4} height={'79vh'} sx={{
                        backgroundColor: '#e5e5e5',
                        display: 'flex',
                        borderRadius: '1rem'
                    }}>
                        <Typography variant="h5" color="initial">Chat Sidebar</Typography>
                    </Grid>

                    {/* CHAT-BODY */}
                    <Grid item md={8} lg={8} >
                        <Typography variant="h5" color="initial" sx={{
                            fontWeight: 'bold',
                            borderBottom: '1px solid #a6a6a6'
                        }} gutterBottom>Room Code : pem24578</Typography>
                        <Grid py={3} px={2}>
                            <MuiMessages socket={socket} />
                            <Box maxWidth={'89%'}>
                                <MuiMessageInp socket={socket} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MuiChat;
