import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Logo from '../../../img/logo.png';
import 'file?name=[name].[ext]!../../../img/logo.png';

class Header extends Component {
  render() {
    const { user, onLogout } = this.props;

    let header = null;
    if (user && user.id) {
      header = (
        <header id="header">
          <Link id="logo" to="/">
            <img className="logo" src={Logo} alt="X-Team"/>
          </Link>
          <h1>X-Map</h1>
          <nav className="navigation">
            <Link className="button" to="/profiles">Profiles</Link>
            <Link className="button" to="/teams">Teams</Link>
            <Link className="button" to={'/profile/' + user.id}>My profile</Link>
            <button className="button" onClick={onLogout}>Logout</button>
          </nav>
        </header>
      );
    }

    return header;
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Header;
