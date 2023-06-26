import { Box, Typography, Grid, Drawer, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import { Helmet } from 'react-helmet';
import MuiMessages from './MuiMessages';
import { LoadingButton } from '@mui/lab';
import './styles/chat.css';
import MuiMessageInp from './MuiMessageInp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { getMessages } from '../apiCalls';

const MuiChat = ({ socket }) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { roomCode, setRoomCode, setUsername, username, setMessages, users, setUsers } = useContext(AuthContext);

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('roomCode');
        setRoomCode('');
        setUsername('');
        setMessages([]);
        navigate('/');
    }

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            navigate('/');
        } else if (sessionStorage.getItem('username') && sessionStorage.getItem('roomCode')) {
            setUsername(sessionStorage.getItem('username'));
            setRoomCode(sessionStorage.getItem('roomCode'));
            getMessages(roomCode).then((response) => {
                console.log(response);
                setMessages(response.messageDatas[0]?.messageData);
            });
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (username) {
            socket.emit('join_room', { roomCode, username, login: false });
            console.log(users);
            socket.on('userJoined', (username) => {
                if (users) {
                    const isExist = users?.some((user) => user === username);
                    if (!isExist) {
                        setUsers(username);
                        toast.success(`${username} joined`);
                    }
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
                                <Typography variant="h6" fontWeight={'bolder'} component={'div'} color="initial">
                                    Side Panel
                                </Typography>
                                <Box>
                                    <Box>
                                        <LoadingButton
                                            loading={false}
                                            variant='outlined'
                                            color='success'
                                            loadingPosition='end'
                                            endIcon={<SaveIcon />}
                                        >
                                            save
                                        </LoadingButton>
                                    </Box>
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
                        <Typography variant="h5" color="initial">Chat Sidebar</Typography>
                        <Box sx={{
                            mr: '3rem',
                            ml: '1rem',
                            my: '2rem',
                        }}>
                            <Box py={2}>
                                <LoadingButton
                                    loading={false}
                                    variant='outlined'
                                    color='success'
                                    loadingPosition='end'
                                    endIcon={<SaveIcon />}
                                >
                                    save
                                </LoadingButton>
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
                            <MuiMessages socket={socket} />
                            <Box maxWidth={{ lg: '89%', md: '89%' }} pt={{ lg: 2, md: 2 }} justifyContent={'center'} sx={{
                                paddingLeft: { lg: '2em', md: '2em' }
                            }}>
                                <MuiMessageInp socket={socket} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item py={3} xs={12} sm={12} sx={{
                        justifyContent: 'space-between',
                        display: { lg: 'none', md: 'none' }
                    }}>
                        <Box height={{ xl: '96%', lg: '96%', md: '95%', sm: '91%', xs: '91%' }} >
                            <MuiMessages socket={socket} />
                        </Box>
                        <Box maxWidth={{ lg: '90%', md: '90%', sx: '95%', xs: '95%' }} pt={{ sm: 1, xs: 1 }} pb={2}>
                            <MuiMessageInp socket={socket} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer
                position="top-center"
                autoClose={1000}
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
