import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
  Auth: {
    region: config.cognito.REGION,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET
  },
  API: {
    endpoints: [
      {
        name: "ads",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
