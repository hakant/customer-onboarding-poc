import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import App from './app/app';

axios.defaults.baseURL = 'https://localhost:5001';
axios.defaults.timeout = 5000;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
