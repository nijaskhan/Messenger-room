import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateAuthContext from './store/AuthContext';
// import CreateMsgContext from './store/MsgContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <CreateAuthContext>
        <App />
    </CreateAuthContext>
);
