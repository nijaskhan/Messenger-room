import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
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
    const [showEmoji, setShowEmoji] = useState(false);
    const { username, roomCode, updateMessages } = useContext(AuthContext);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleEmojiClick = (emojiObject, event) => {
        setMessage(message + emojiObject.emoji);
    }
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
            setShowEmoji(false);
        }
    }
    return (
        <>
            <Box>
                <Stack sx={{
                    position: 'fixed',
                    bottom: {lg:'19.2%', md: '19.2%', xs: '17%',sm: '16.5%'},
                    zIndex: '1'
                }}>
                    {showEmoji &&
                        <EmojiPicker
                            previewConfig={{ showPreview: false }}
                            width={{lg:'20em', md: '20em', sm: '5em', xs: '5em' }}
                            height={'20em'}
                            onEmojiClick={handleEmojiClick}
                        />
                    }
                </Stack>
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
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setShowEmoji(!showEmoji)}><EmojiEmotionsIcon /></IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </>
    )
}

export default MuiMessageInp