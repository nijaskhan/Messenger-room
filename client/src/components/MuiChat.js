import { Box, Container, Typography, Grid } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';

const MuiChat = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>React Messenger | Home</title>
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
                <Grid container spacing={2} justifyContent={'center'} height={'90vh'} sx={{
                    border: '1px solid black',
                    borderRadius: '2rem',
                    padding: '2rem',
                    backgroundColor: 'white',
                    boxShadow: "1px 0px 15px ##1a1a1af"
                }}>

                    {/* CHAT-SIDEBAR */}
                    <Grid item md={6} lg={4} height={'83vh'} sx={{
                        backgroundColor: '#e5e5e5',
                        display: 'flex',
                        borderRadius: '1rem'
                    }}>
                        <Typography variant="h5" color="initial">Chat Sidebar</Typography>
                    </Grid>

                    {/* CHAT-BODY */}
                    <Grid item md={6} lg={8} >
                        <Typography variant="h5" color="initial" sx={{
                            fontWeight: 'bold'
                        }} gutterBottom>Room Code : pem24578</Typography>
                        <Grid container spacing={0} py={3} px={2}>
                            <Typography variant="body1" color="initial">message1</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MuiChat
