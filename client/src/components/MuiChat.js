import { Box, Typography, Grid, Drawer, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Helmet } from 'react-helmet';
import MuiMessages from './MuiMessages';
import './styles/chat.css';
import MuiMessageInp from './MuiMessageInp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { getMessages } from '../apiCalls';

const MuiChat = ({ socket }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { roomCode, setRoomCode, setUsername, username, setMessages, users, setUsers } = useContext(AuthContext);

    const [hasMore, setHasMore] = useState(true);

    const handleSaveRoom = (event) => {
        // console.log("dark mode : ", event.target.checked);
        if (event.target.checked) toast.success('Room saved');
        setChecked(event.target.checked);
    }
    const handleLogout = () => {
        socket.emit('logout', { roomCode, username });
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('roomCode');
        setRoomCode('');
        setUsername('');
        setMessages([]);
        window.location.reload();
    }

    // useEffect(() => {
    //     if (!sessionStorage.getItem('username')) {
    //         navigate('/');
    //     } else if (sessionStorage.getItem('username') && sessionStorage.getItem('roomCode')) {
    //         setUsername(sessionStorage.getItem('username'));
    //         setRoomCode(sessionStorage.getItem('roomCode'));
    //         getMessages(sessionStorage.getItem('roomCode'), 0).then((response) => {
    //             if (response?.messageDatas?.messageData) setMessages(response.messageDatas?.messageData);
    //         });
    //     } else {
    //         navigate('/');
    //     }
    //     socket.on('loggedOut', (username)=>{
    //         toast.success(`${username} Left room`);
    //         console.log("logged out");
    //     });
    //     socket.emit('join_room', { roomCode, username, login: false });
    //     // eslint-disable-next-line
    // }, []);
    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            navigate('/');
        } else if (sessionStorage.getItem('username') && sessionStorage.getItem('roomCode')) {
            setUsername(sessionStorage.getItem('username'));
            setRoomCode(sessionStorage.getItem('roomCode'));
            getMessages(sessionStorage.getItem('roomCode'), 0).then((response) => {
                if (response?.messageDatas?.messageData) setMessages(response.messageDatas?.messageData);
            });
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleLoggedOut = (username) => {
            toast.success(`${username} Left room`);
            console.log("logged out");
        };

        socket.on('loggedOut', handleLoggedOut);
        socket.emit('join_room', { roomCode, username, login: false });

        return () => {
            socket.off('loggedOut', handleLoggedOut);
        };
        // eslint-disable-next-line
    }, [roomCode, username]);

    useEffect(() => {
        if (username) {
            socket.on('userJoined', (username) => {
                let isExist = true;
                if (users) {
                    isExist = users.some((user) => user === username);
                    if (!isExist) {
                        setUsers([...users, username]);
                        toast.success(`${username} joined`);
                    }
                } else {
                    setUsers([username]);
                }
            })
        }
        // eslint-disable-next-line
    }, [username]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messenger | Home</title>
            </Helmet>
            <Box mx={{ lg: '15rem', xs: '0', sm: '0', md: '6rem' }} height={'100vh'} justifyContent={'center'} sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'hidden'
            }}>
                <Grid container spacing={{ md: 1, lg: 1 }} justifyContent={'center'} className='chatContainer' height={{ xl: '84%', lg: '89%', md: '91%', sm: '100%', xs: '100%' }} sx={{
                    border: '1px solid black',
                    borderRadius: { lg: '2rem', md: '2rem', xs: '0', sm: '0' },
                    padding: '1.5rem',
                    backgroundColor: { lg: 'rgba(255, 255, 255, 0.9)', md: 'rgba(255, 255, 255, 0.9)', sm: 'white', xs: 'white' },
                    // backgroundColor: 'white',
                    boxShadow: "1px 0px 15px ##1a1a1af"
                }}>
                    {/* chat drawer */}
                    <Grid item pt={{ xs: '.2em', sm: '.2em' }} xs={2} sm={2} sx={{ cursor: 'pointer', color: 'black', display: { xs: 'flex', lg: 'none', md: 'none', sm: 'flex' } }}>
                        <ViewSidebarIcon onClick={() => setDrawerOpen(true)} />
                        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                            <Box p={2} width={'250px'} height={'100vh'} textAlign={'center'} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    marginLeft: '2em',
                                }}>
                                    <img
                                        src="https://clipground.com/images/messenger-logo-png-6.png"
                                        alt="Messenger Logo"
                                        style={{ width: '40px', height: '35px', marginRight: '8px' }}
                                    />
                                    <Typography
                                        variant="h5"
                                        color="initial"
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                        gutterBottom
                                    >
                                        Messenger
                                    </Typography>
                                </Box>
                                <Box>
                                    <Button variant="outlined" sx={{ mx: '3em' }} endIcon={<FormControlLabel control={<Switch checked={checked} onChange={handleSaveRoom} color={'success'} />} />} color="success">Save room</Button>
                                    <Button variant="outlined" sx={{ mx: '3em', my: '2em' }} onClick={() => setShowDialog(true)} endIcon={<LogoutIcon />} color="error">Leave room</Button>
                                </Box>
                            </Box>
                        </Drawer>
                    </Grid>
                    {/* CHAT-SIDEBAR */}
                    <Grid item md={4} lg={4} height={{ xl: '98%', lg: '98%', md: '97%', sm: '90%', xs: '90%' }}
                        sx={{
                            backgroundColor: '#e5e5e5',
                            display: { xs: 'none', md: 'flex', lg: 'flex' },
                            flexDirection: 'column',
                            borderRadius: '1rem',
                            justifyContent: 'space-between'
                        }}>
                        <Box sx={{
                            display: 'flex',
                            marginLeft: '1em',
                            marginTop: '0.5em'
                        }}>
                            <img
                                src="https://clipground.com/images/messenger-logo-png-6.png"
                                alt="Messenger Logo"
                                style={{ width: '40px', height: '35px', marginRight: '8px' }}
                            />
                            <Typography
                                variant="h5"
                                color="initial"
                                sx={{
                                    fontWeight: 'bold'
                                }}
                                gutterBottom
                            >
                                Messenger
                            </Typography>
                        </Box>
                        <Box sx={{
                            mr: '3rem',
                            ml: '1rem',
                            my: '2rem',
                        }}>
                            <Box py={2}>
                                <Button variant="outlined" sx={{ mr: '3em' }} endIcon={<FormControlLabel control={<Switch checked={checked} onChange={handleSaveRoom} color={'success'} />} />} color="success">Save room</Button>
                            </Box>
                            <Box>
                                <Button variant="outlined" endIcon={<LogoutIcon />} onClick={() => setShowDialog(true)} color="error">Leave room</Button>
                            </Box>
                            <Dialog
                                open={showDialog}
                                fullWidth
                            >
                                <DialogTitle >
                                    Are you sure want to Leave Room ?
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        If you leave room without saving, the messages will be lost.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="outlined" color="success" onClick={() => setShowDialog(false)}>
                                        Go Back To Chat
                                    </Button>
                                    <Button variant="contained" autoFocus color="error" onClick={handleLogout}>
                                        Leave Room
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Grid>
                    {/* CHAT-BODY */}
                    <Grid item xs={10} sm={10} md={8} lg={8} >
                        <Typography variant="h5" color="initial" sx={{
                            fontWeight: 'bold',
                            borderBottom: '1px solid #a6a6a6'
                        }} gutterBottom>Room Code : {roomCode}</Typography>
                        <Grid item py={3} lg={12} md={12} sx={{
                            justifyContent: 'space-between',
                            display: { sm: 'none', xs: 'none', md: 'block', lg: 'block' }
                        }}>
                            <MuiMessages socket={socket} hasMore={hasMore} setHasMore={setHasMore} />
                            <Box maxWidth={{ lg: '89%', md: '89%' }} pt={{ lg: 2, md: 2 }} justifyContent={'center'} sx={{
                                paddingLeft: { lg: '2em', md: '2em' }
                            }}>
                                <MuiMessageInp socket={socket} hasMore={hasMore} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item py={3} xs={12} sm={12} sx={{
                        justifyContent: 'space-between',
                        display: { lg: 'none', md: 'none' }
                    }}>
                        <Box height={{ xl: '96%', lg: '96%', md: '95%', sm: '91%', xs: '91%' }} >
                            <MuiMessages socket={socket} hasMore={hasMore} setHasMore={setHasMore} />
                        </Box>
                        <Box maxWidth={{ lg: '90%', md: '90%', sx: '95%', xs: '95%' }} pt={{ sm: 1, xs: 1 }} pb={2}>
                            <MuiMessageInp socket={socket} hasMore={hasMore} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer
                position="top-center"
                autoClose={800}
                limit={1}
                hideProgressBar={true}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                transition={Zoom}
                theme="light"
            />
        </>
    )
}

export default MuiChat;
