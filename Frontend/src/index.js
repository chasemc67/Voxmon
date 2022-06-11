import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {UseWalletProvider} from 'use-wallet';


ReactDOM.render(
  <React.StrictMode>
    <UseWalletProvider chainId={`${parseInt(process.env.REACT_APP_ETHEREUM_CHAIN_ID)}`} autoConnect={true} connectors={{
        injected: {
          chainId: [`${parseInt(process.env.REACT_APP_ETHEREUM_CHAIN_ID)}`],
        },
        walletconnect: {
          chainId: [`${parseInt(process.env.REACT_APP_ETHEREUM_CHAIN_ID)}`],
          rpcUrl: process.env.REACT_APP_WALLET_CONNECT_RPC,
        }
      }}
    >
      <Router>
        <App />
      </Router>
    </UseWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
