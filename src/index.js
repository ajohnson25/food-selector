import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FoodItems from './foodItems';
import materialize from './materialize/js/bin/materialize';

import './scss/style.scss';
import './scss/materialize.scss';

const title = 'Food Selector';

const foodItems = new FoodItems();

ReactDOM.render(
    <App title={title} />,
    document.getElementById('app')
);

module.hot.accept();
