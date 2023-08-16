import axios from 'axios';
//pending: provide security for api endpoint
import {BASE_URL} from './constants';

export const getMessages = async(roomCode, page) => {
    try{
        const response = await axios.get(`${BASE_URL}/api/getMessages?roomCode=${roomCode}&page=${page}`);
        return response.data;
    }catch(err){
        return err.message;
    }
}