import * as React from 'react';

class Sidenav extends React.Component {
  render () {
    return <>
      <ul id="slide-out" className="sidenav">
        <li><a href="#">Select Foods (to be implemented)</a></li>
        <li><a href="#">Show Results (to be implemented)</a></li>
        <li><a href="#">Download List (to be implemented)</a></li>
        <li><a href="#"><span className="danger-text">Delete All Data</span> (to be implemented)</a></li>
      </ul>
    </>;
  }
}

export default Sidenav;
