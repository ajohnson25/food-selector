import * as React from 'react';
import Food from './Food';
import Results from './Results';
import User from '../user';
import { Icon, NavItem, Navbar } from 'react-materialize';

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

  resultsClick () {
    this.setState({ hasMoreFoods: false });
  }

  selectClick () {
    this.setState({ hasMoreFoods: true });
  }

  // Remove the users uuid for now and refresh the page
  deleteClick () {
    window.localStorage.removeItem('uuid');
    location.reload();
  }

  render () {
    return <>
      <Navbar className="orange lighten-1" brand = {<a href="#">{this.state.title}</a>} alignLinks="right" id="mobile-nav" menuIcon={<Icon large>menu</Icon>}>
        <NavItem onClick={this.selectClick.bind(this)}>Select Foods</NavItem>
        <NavItem onClick={this.resultsClick.bind(this)}>Show Results</NavItem>
        <NavItem onClick={this.deleteClick.bind(this)}>Start Over</NavItem>
      </Navbar>
      {this.state.hasMoreFoods ? <Food hasMoreFoods={this.checkHasMoreFoods.bind(this)}/> : <Results/>}

      {/*       <SideNav id="SideNav-1">
        <SideNavItem href="#!selectfoods">Select Foods (to be implemented)</SideNavItem>
        <SideNavItem href="#!showresults">Show Results (to be implemented)</SideNavItem>
        <SideNavItem href="#!downloadlist">Download List (to be implemented)</SideNavItem>
        <SideNavItem href="#!deleteall">Delete All Data(to be implemented)</SideNavItem>
      </SideNav> */}
    </>;
  }
}
export default App;
