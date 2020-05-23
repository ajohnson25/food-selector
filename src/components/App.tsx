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

  render () {
    return <>
      {/* <Nav title = {this.state.title} /> */}
      <Navbar className="orange lighten-1" brand = {<a href="#">{this.state.title}</a>} alignLinks="right" id="mobile-nav" menuIcon={<Icon large>menu</Icon>}>
        <NavItem href="#!selectfoods">Select Foods (to be implemented)</NavItem>
        <NavItem href="#!selectfoods">Show Results (to be implemented)</NavItem>
        <NavItem href="#!downloadlist">Download List (to be implemented)</NavItem>
        <NavItem href="#!deleteall">Delete All Data(to be implemented)</NavItem>
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
