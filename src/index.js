import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
=======
// import './index.css';
>>>>>>> d65e269104f5d8e0a7e57097498671a3fd3b93d9
import './assets/main.scss';
import { RootCmp } from './RootCmp.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
