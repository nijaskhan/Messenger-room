import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';

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

const MuiMessageInp = () => {
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    const handleEmojiClick = (emojiObject, event) => {
        setMessage(message + emojiObject.emoji);
    }
    return (
        <>
            <Box>
                <Stack sx={{
                    position: 'absolute',
                    bottom: 120,
                }}>
                    {showEmoji &&
                        <EmojiPicker
                            previewConfig={{ showPreview: false }}
                            width={'20em'}
                            height={'20em'}
                            lazyLoadEmojis={true}
                            onEmojiClick={handleEmojiClick}
                        />
                    }
                </Stack>
                <CustomTextField
                    fullWidth
                    id=""
                    placeholder='Message...'
                    width="90%"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    color='black'
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton><SendIcon color='primary' /></IconButton>
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