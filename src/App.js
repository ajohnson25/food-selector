import React from 'react';
import Nav from './Nav';
import Food from './Food';

const App = ({ title }) =>
  <div>
    <Nav title = {title}/>
    <Food />
  </div>;

export default App;