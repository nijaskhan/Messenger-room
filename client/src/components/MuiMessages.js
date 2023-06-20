import { Grid, Typography, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect } from 'react';
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
                        height: '65vh',
                        width: '65vw'
                    }}>
                        {/* author messages */}
                        {messages.length ? (
                            messages.map((messageDet, index) => {
                                return (
                                    <>
                                        {messageDet.author !== username ? (
                                            <Grid container columnGap={1} py={0.5} >
                                                <Grid item>
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                                        N
                                                    </Avatar>
                                                </Grid>
                                                <Grid item xs={"auto"}  >
                                                    <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                                        {messageDet.message}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <Grid container columnGap={1} py={1.5} px={0.5}>
                                                <Grid item xs={"auto"} ml={'auto'} >
                                                    <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                                        {messageDet.message}
                                                    </Typography>
                                                </Grid>
                                                <Grid item >
                                                    <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                                        G
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </>
                                )
                            })
                        ) : (
                            <>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <Typography variant="h3" color="initial">animation here</Typography>
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