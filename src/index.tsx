import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import reportWebVitals from './reportWebVitals';
import { Routes } from 'router';
import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU';

import 'index.scss';
import { IntlProvider } from 'rsuite';

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={ruRU}>
      <BrowserRouter basename="/index.html">
        <HashRouter>
          <Routes />
        </HashRouter>
      </BrowserRouter>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
