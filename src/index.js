import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { BrowserRouter } from "react-router-dom"
import { UserProvider} from "./components/UserContext/UserContext"

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
  ,

  document.getElementById('root')
);



