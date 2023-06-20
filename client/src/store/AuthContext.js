import {useState, createContext} from 'react';

export const AuthContext = createContext(null);

export default function CreateAuthContext({children}){
    const [username, setUsername] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [messages, setMessages] = useState([]);

    const updateMessages=(newMessage)=>{
        setMessages([...messages, newMessage]);
    };

    return(
        <AuthContext.Provider value={{username, setUsername, roomCode, setRoomCode, messages, updateMessages, setMessages}}>
            {children}
        </AuthContext.Provider>
    )
};