import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import General from './general';
import * as serviceWorker from './serviceWorker';


// Only scripts
// import Popper from 'popper.js';

// Only styles
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<General />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


