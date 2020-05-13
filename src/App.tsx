import * as React from 'react';
import Nav from './Nav';
import Food from './Food';
import Results from './Results';


interface Props{
  title: string;
}

interface State{
  title: string;
  hasMoreFoods: string; //TODO:Need to turn into boolean later
  results: string|null;
}

class App extends React.Component<Props, State> {
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.title,
      hasMoreFoods: 'true',
      results: ''
    };
  }

  checkHasMoreFoods (hasMoreFoods) {
    this.setState({ hasMoreFoods });
    this.setState({ results: window.localStorage.getItem('results') });
  }

  render () {
    return <div>
      <Nav title = {this.state.title} />
      {this.state.hasMoreFoods ? <Food hasMoreFoods={this.checkHasMoreFoods.bind(this)}/> : <Results results={this.state.results}/>}
    </div>;
  }
}
export default App;
