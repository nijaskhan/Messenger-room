import { Grid, Typography, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect } from 'react';
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

    // lottie-animation configuration
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        socket.on("receiveMessage", (messageData) => {
            updateMessages(messageData);
        });
        // Cleaning up the event listener when the component is unmounted
        return () => {
            socket.off("receiveMessage");
        };
        // eslint-disable-next-line
    }, [messages]);

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Box display="flex" mb={1} >
                    {/* message container */}
                    <Box ml={1} className={classes.scrollbar} sx={{
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        height: '65vh',
                        width: '100%'
                    }}>
                        {/* author messages */}
                        {messages.length ? (
                            messages.map((messageDet) => {
                                return (
                                    <React.Fragment key={messageDet.key}>
                                        {messageDet.author !== username ? (
                                            <Grid container columnGap={1} pb={0.5}>
                                                <Grid item>
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                                        {messageDet.author[0]}
                                                    </Avatar>
                                                </Grid>
                                                <Grid item sx={{
                                                    display: 'flex',
                                                    maxWidth: '70%',
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
                                                    maxWidth: '70%',
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
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
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
                                <Box width={{ md: '100%', lg: '100%' }} height={{ md: '100%', lg: '100%' }}>
                                    <Lottie options={defaultOptions}
                                        height={360}
                                        width={300}
                                    />
                                    {/* <Typography variant="h4" sx={{fontWeight: 'bold', fontStyle: 'italic'}} color="initial">Say Hii !!!</Typography> */}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MuiMessages;