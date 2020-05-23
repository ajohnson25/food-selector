import * as React from 'react';
import Nav from './Nav';
import Food from './Food';
import Results from './Results';
import User from '../user';

interface Props{
  title: string;
}

interface State{
  title: string;
  hasMoreFoods: boolean;
  uuid: string | null;
}

class App extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      title: this.props.title,
      hasMoreFoods: true,
      uuid: new User().getUUID()
    };
  }

  checkHasMoreFoods (hasMoreFoods: boolean) {
    this.setState({ hasMoreFoods });
  }

  render () {
    return <div>
      <Nav title = {this.state.title} />
      {this.state.hasMoreFoods ? <Food hasMoreFoods={this.checkHasMoreFoods.bind(this)}/> : <Results/>}
    </div>;
  }
}
export default App;
