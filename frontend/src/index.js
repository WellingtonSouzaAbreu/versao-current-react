import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import storeConfig from './../src/config/storeConfig.js'

const store = storeConfig()

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// Temporário // COnfigura para todas as requisições axios o header authorization com o token cálido
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IldlbGxpbmdvbiIsImVtYWlsIjoid2VsbGluZ3RvbkBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTk4MTE2OTI0LCJleHAiOjE1OTgzNzYxMjR9.88PDm9GSP1t3bQ4cE1eQvwk180uhsx2rjsV6L4a-61I'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
