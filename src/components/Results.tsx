import * as React from 'react';
import FoodItems from '../foodItems';

interface Props{
}

interface State{
  results: any[]
}
let foodItems: any;

class Results extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    foodItems = new FoodItems();
    this.state = {
      results: JSON.parse(window.localStorage.getItem('results') ?? '')
    };
    foodItems.getResults().then((result: any) => this.setState({ results: result }));
  }

  render () {
    return <div className="container" id="content">
      <h1 id="result-header">Results</h1>
      {this.state.results.map((b: any) => (<p key={b.id} className="result-name">{b.fd_name} : {b.fp_name}</p>))}
    </div>;
  }
}

export default Results;
