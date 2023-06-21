import { Box, Typography, Grid, Drawer } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { Helmet } from 'react-helmet';
import MuiMessages from './MuiMessages';
import './styles/chat.css';
import MuiMessageInp from './MuiMessageInp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

const MuiChat = ({ socket }) => {
    const navigate = useNavigate();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { roomCode, setRoomCode, setUsername, username } = useContext(AuthContext);

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            navigate('/');
        } else if (sessionStorage.getItem('username') && sessionStorage.getItem('roomCode')) {
            setRoomCode(sessionStorage.getItem('roomCode') || '');
            setUsername(sessionStorage.getItem('username') || '');
            socket.emit('join_room', { roomCode, username });
        } else {
            navigate('/');
        }
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messenger | Home</title>
            </Helmet>
            <Box mx={2} height={'100vh'} justifyContent={'center'} sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                
                <Grid container spacing={{md:1, lg:1}} justifyContent={'center'} height={'90%'} sx={{
                    border: '1px solid black',
                    borderRadius: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    // backgroundColor: 'white',
                    boxShadow: "1px 0px 15px ##1a1a1af"
                }}>
                    <Grid item pt={2.5} xs={2} sm={2} sx={{ cursor: 'pointer', color:'black', display:{xs:'flex', lg:'none', md:'none', sm:'flex'} }}>
                        <ViewSidebarIcon onClick={() => setDrawerOpen(true)} />
                        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                            <Box p={2} width={'250px'} textAlign={'center'} role='presentation'>
                                <Typography variant="h6" fontWeight={'bolder'} component={'div'} color="initial">
                                    Side Panel
                                </Typography>
                            </Box>
                        </Drawer>
                    </Grid>

                    {/* CHAT-SIDEBAR */}
                    <Grid item md={4} lg={4} height={'79vh'}
                        sx={{
                            backgroundColor: '#e5e5e5',
                            display: { xs: 'none', md: 'flex', lg: 'flex' },
                            borderRadius: '1rem'
                        }}>
                        <Typography variant="h5" color="initial">Chat Sidebar</Typography>
                    </Grid>

                    {/* CHAT-BODY */}
                    <Grid item xs={10} sm={10} md={8} lg={8} >
                        <Typography variant="h5" color="initial" sx={{
                            fontWeight: 'bold',
                            borderBottom: '1px solid #a6a6a6'
                        }} gutterBottom>Room Code : {roomCode}</Typography>
                        <Grid item py={3} lg={12} md={12} sx={{
                            justifyContent: 'center',
                            display: {sm: 'none', xs: 'none', md: 'block', lg: 'block'}
                        }}>
                            <MuiMessages socket={socket} />
                            <Box maxWidth={{lg:'89%',md:'89%'}} justifyContent={'center'} sx={{
                                paddingLeft: {lg: '2em', md: '2em'}
                            }}>
                                <MuiMessageInp socket={socket} />
                            </Box>
                        </Grid>
                    </Grid>
                        <Grid item py={3} xs={12} sm={12} sx={{
                            justifyContent: 'center',
                            display: {lg: 'none',md: 'none'}
                        }}>
                            <MuiMessages socket={socket} />
                            <Box maxWidth={{lg:'90%',md:'90%',sx:'95%',xs:'95%'}} >
                                <MuiMessageInp socket={socket} />
                            </Box>
                        </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MuiChat;
