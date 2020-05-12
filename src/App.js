import React, { Component } from 'react';
import Nav from './Nav';
import Food from './Food';
import Results from './Results';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.title,
      hasMoreFoods: 'true',
      results: []
    };
  }

  checkHasMoreFoods (hasMoreFoods) {
    this.setState({ hasMoreFoods });
    this.setState({ results: window.localStorage.getItem('results') });
  }

  render (title) {
    return <div>
      <Nav title = {this.state.title} />
      {this.state.hasMoreFoods ? <Food hasMoreFoods={this.checkHasMoreFoods.bind(this)}/> : <Results results={this.state.results}/>}
    </div>;
  }
}
export default App;
