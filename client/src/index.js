import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateAuthContext from './store/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <CreateAuthContext>
        <App />
    </CreateAuthContext>
);
