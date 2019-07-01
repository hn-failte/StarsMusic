import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from "react-router-dom";

import "@static/flexible"
import "@static/reset.css"

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
