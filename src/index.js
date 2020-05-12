import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import materialize from './materialize/js/bin/materialize';

import './scss/style.scss';
import './scss/materialize.scss';

const title = 'Food Selector'; 
M.AutoInit();

ReactDOM.render(
    <App title={title} />,
    document.getElementById('root')
);

module.hot.accept();
