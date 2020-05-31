import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/life';
import Router from './router'
import * as serviceWorker from './serviceWorker';
const mock = false;
if (mock) {
  require('./mock/index');
}
ReactDOM.render(
  // <React.StrictMode>
  //   <Admin />
  // </React.StrictMode>,
  <Router />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
