import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { UserProvider } from "./common/UserContext";
import './index.css';
import Alert from "react-s-alert"


ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
      <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
    </BrowserRouter>
  </UserProvider>
  ,

  document.getElementById('root')
);



