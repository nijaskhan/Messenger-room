import { Grid, Typography, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import MuiMessageInp from './MuiMessageInp';

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

const MuiMessages = () => {
    const classes = useStyles();

    return (
        <>
            <Box display="flex" flexDirection="column">
                <Box display="flex" mb={1}>
                    {/* message container */}
                    <Box ml={1} className={classes.scrollbar} sx={{
                        overflowY: 'scroll',
                        height: '65vh',
                    }}>
                        {/* author messages */}
                        <Grid container columnGap={1} py={0.5}>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                    N
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={0.5}>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                    N
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={0.5}>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                    N
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={0.5}>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#cc7a00' }}>
                                    N
                                </Avatar>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#737373', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* reply messages */}
                        <Grid container columnGap={1} py={1.5} px={0.5}>
                            <Grid item xs={6} ml={'auto'}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                    G
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={1.5} px={0.5}>
                            <Grid item xs={6} ml={'auto'}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                    G
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={1.5} px={0.5}>
                            <Grid item xs={6} ml={'auto'}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                    G
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={1.5} px={0.5}>
                            <Grid item xs={6} ml={'auto'}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                    G
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container columnGap={1} py={1.5} px={0.5}>
                            <Grid item xs={6} ml={'auto'}>
                                <Typography variant="body2" gutterBottom color="white" sx={{ wordWrap: 'break-word', backgroundColor: '#47476b', borderRadius: '1.5rem', padding: '0.5rem' }}>
                                    message1message1message1message1message1message1message1message1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar variant="circle" alt="proPic" sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>
                                    G
                                </Avatar>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                
                <MuiMessageInp />
            </Box>
        </>
    )
}

export default MuiMessages;