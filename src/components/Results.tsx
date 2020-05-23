import * as React from 'react';

interface Props{

}

interface State{
  results: any[]
}

class Results extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      results: JSON.parse(window.localStorage.getItem('results') ?? '')
    };
  }

  render () {
    return <div className="container" id="content">
      <h1 id="result-header">Results</h1>
      {this.state.results.map((result) => (<p key={result.id} className="result-name">{result.foodName} : {result.response}</p>))}
    </div>;
  }
}

export default Results;
