import {useState, createContext} from 'react';

export const AuthContext = createContext(null);

export default function CreateAuthContext({children}){
    const [username, setUsername] = useState('');
    const [roomCode, setRoomCode] = useState('');
    return(
        <AuthContext.Provider value={{username, setUsername, roomCode, setRoomCode}}>
            {children}
        </AuthContext.Provider>
    )
};