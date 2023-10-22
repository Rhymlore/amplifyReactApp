import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify'
import config from './aws-exports'
import { BrowserRouter } from 'react-router-dom';
Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root'));
const basename = process.env.NODE_ENV === 'development' ? '/' : '/<YOUR_REPOSITORY_NAME>/';
root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
