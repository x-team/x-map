import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderAuthenticated from './HeaderAuthenticated';
import HeaderAnonymous from './HeaderAnonymous';

import Logo from '../../../img/logo.png';
import 'file?name=[name].[ext]!../../../img/logo.png';

class Header extends Component {
  render() {
    const { user, onLogout } = this.props;

    let header;
    if (user && user.id) {
      header = <HeaderAuthenticated user={user} onLogout={onLogout}/>;
    } else {
      header = <HeaderAnonymous />;
    }

    return (
      <header id="header">
        <Link id="logo" to="/">
          <img className="logo" src={Logo} alt="X-Map brand"/>
        </Link>
        <h1>X-Map</h1>
        {header}
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Header;
