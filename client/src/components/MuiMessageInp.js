import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthContext';

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8rem',
            '& fieldset': {
                borderColor: 'grey',
                color: 'black',
            },
        },
        '& label': {
            color: 'black',
        }
    },
})(TextField);

const MuiMessageInp = ({ socket }) => {
    const [message, setMessage] = useState("");
    const { username, roomCode, updateMessages } = useContext(AuthContext);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSendMsg = async () => {
        if (message.length > 0) {
            const key = uuidv4();
            const messageData = {
                roomCode: roomCode,
                author: username,
                key: key,
                message: message,
                time: time
            }
            updateMessages(messageData);
            await socket.emit("sendMessage", messageData);
            setMessage("");
        }
    }
    return (
        <>
            <Box>
                <CustomTextField
                    fullWidth
                    placeholder='Message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    color='black'
                    onKeyUp={(e) => {
                        if (e.key === "Enter") handleSendMsg();
                    }}
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSendMsg}><SendIcon color='primary' /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </>
    )
}

export default MuiMessageInp;