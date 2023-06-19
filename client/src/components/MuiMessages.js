import { Grid, Typography, Avatar, Stack } from '@mui/material';
import React from 'react';

const MuiMessages = () => {
    return (
        <>
            {/* author chat */}
            <Grid container columnGap={1}>
                <Avatar variant='circle' alt={'proPic'} sx={{ width: 35, height: 35, bgcolor: '#cc9900' }}>N</Avatar>
                <Stack direction={'column'} spacing={0.5}>
                    <Grid item sx={{
                        backgroundColor: '#737373',
                        borderRadius: '1.5rem'
                    }}
                    >
                        <Typography
                            p={1}
                            variant="body2"
                            color="white"
                            sx={{
                                textAlign: 'center',
                                maxWidth: '15rem',
                                wordWrap: 'break-word'
                            }}
                        >
                            message1message1message1message1message1message1message1message1
                        </Typography>
                    </Grid>
                    <Grid item sx={{
                        backgroundColor: '#737373',
                        borderRadius: '1.5rem'
                    }}
                    >
                        <Typography
                            p={1}
                            variant="body2"
                            color="white"
                            sx={{
                                textAlign: 'center',
                                maxWidth: '15rem',
                                wordWrap: 'break-word'
                            }}
                        >
                            message1message1message1message1message1message1message1message1
                        </Typography>
                    </Grid>
                </Stack>
            </Grid>

            {/* reply chat */}
            <Grid container columnGap={1} py={2} >
                <Avatar variant='circle' alt={'proPic'} sx={{ width: 35, height: 35, bgcolor: '#00802b' }}>N</Avatar>
                <Grid item sx={{
                    backgroundColor: 'blue',
                    borderRadius: '1.5rem',
                }}
                >
                    <Typography
                        p={1}
                        variant="body2"
                        color="white"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '15rem',
                            wordWrap: 'break-word'
                        }}
                    >
                        message1message1message1message1message1message1message1message1
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default MuiMessages;