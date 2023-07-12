import { Grid, Typography, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../animations/say_hi_Robo.json';
import { AuthContext } from '../store/AuthContext';

const useStyles = makeStyles(() => ({
    scrollbar: {
        '&::-webkit-scrollbar': {
            width: '3px',
            backgroundColor: '#f5f5f5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555'
        },
    }
}));

const MuiMessages = ({ socket }) => {
    const classes = useStyles();
    const { messages, updateMessages, username } = useContext(AuthContext);
    const chatContainerRef = useRef(null);

    // lottie-animation configuration
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        socket.on("receiveMessage", (messageData) => {
            updateMessages(messageData);
        });
        scrollToBottom();
        // Cleaning up the event listener when the component is unmounted
        return () => {
            socket.off("receiveMessage");
        };
        // eslint-disable-next-line
    }, [messages]);

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Box display="flex" >
                    {/* message container */}
                    <Box ml={1} ref={chatContainerRef} className={classes.scrollbar} sx={{
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth',
                        transition: 'scroll-top 0.3s ease-out',
                        height: { lg: '61vh', md: '61vh', sm: '72vh', xs: '72vh' },
                        width: '100%'
                    }}>
                        {/* author messages */}
                        {messages.length!==0||null ? (
                            messages.map((messageDet) => {
                                return (
                                    <React.Fragment key={messageDet.key}>
                                        {messageDet.author !== username ? (
                                            <Grid container columnGap={1} pb={0.5}>
                                                <Grid item>
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, textAlign: 'center', bgcolor: '#cc7a00' }}>
                                                        {messageDet.author[0]}
                                                    </Avatar>
                                                </Grid>
                                                <Grid item sx={{
                                                    display: 'flex',
                                                    maxWidth: '65%',
                                                    flexDirection: 'column',
                                                }}>
                                                    <Typography variant="body2" color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem', textAlign: 'center' }}>
                                                        {messageDet.message}
                                                    </Typography>
                                                    <Typography variant="caption" gutterBottom sx={{ marginTop: '0.2em', fontSize: '0.5em', display: 'block' }}>
                                                        {messageDet.time} * {messageDet.author}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <Grid container columnGap={1} pb={0.5} px={0.5}>
                                                <Grid item ml="auto" sx={{
                                                    display: 'flex',
                                                    maxWidth: '65%',
                                                    flexDirection: 'column',
                                                }}>
                                                    <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem', textAlign: 'center' }}>
                                                        {messageDet.message}
                                                    </Typography>
                                                    <Typography variant="caption" gutterBottom sx={{ marginTop: '0.2em', fontSize: '0.5em', display: 'block' }}>
                                                        {messageDet.time} * {messageDet.author}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, textCenter: 'center', bgcolor: '#00802b' }}>
                                                        {messageDet.author[0]}
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </React.Fragment>
                                )
                            })
                        ) : (
                            <>
                                <Lottie options={defaultOptions}
                                    height={360}
                                    width={300}
                                />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MuiMessages;