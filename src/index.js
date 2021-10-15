import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Alert from "react-s-alert";
import App from "./App";
import { ScrollPosition } from "./common/ScrollContext";
import { UserProvider } from "./common/UserContext";
import "./index.scss";


ReactDOM.render(
  <UserProvider>

      <BrowserRouter>
        <ScrollPosition>

          <App />

          <Alert
            stack={{ limit: 3 }}
            timeout={3000}
            position="top-right"
            effect="slide"
            offset={65}
          />
          
        </ScrollPosition>
      </BrowserRouter>

  </UserProvider>,
  document.getElementById("root")
);
