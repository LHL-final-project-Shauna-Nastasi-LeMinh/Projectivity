import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";
import './index.css';
import App from './App';
import WebFont from "webfontloader";
WebFont.load({google: {families: ["Roboto:300,400,500"]}});


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
