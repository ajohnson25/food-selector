import * as React from 'react';

interface Props{
  title: string
}

class Nav extends React.Component<Props> {
  render () {
    return <nav className="orange lighten-1" role="navigation">
      <div className="nav-wrapper container"><a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><img src="https://storage.googleapis.com/triple-nectar-274118.appspot.com/images/bars-solid.svg" width="64px" height="64px" className="navbar-icons" /></a><a id="logo-container" href="/" className="brand-logo">{this.props.title}</a>
        <ul className="right">
          <li><img src="https://storage.googleapis.com/triple-nectar-274118.appspot.com/images/user-solid.svg" width="64px" height="64px" className="navbar-icons" /></li>
        </ul>
      </div>
    </nav>;
  }
}

export default Nav;
