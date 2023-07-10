import {useState, createContext} from 'react';

export const AuthContext = createContext(null);

export default function CreateAuthContext({children}){
    const [username, setUsername] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const updateMessages=(newMessage)=>{
        if(newMessage){
            setMessages([...messages, newMessage]);
        }
    };

    return(
        <AuthContext.Provider value={{username, setUsername, roomCode, setRoomCode, messages, updateMessages, setMessages, users, setUsers}}>
            {children}
        </AuthContext.Provider>
    )
};