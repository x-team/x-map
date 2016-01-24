import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderAuthenticated from './HeaderAuthenticated';
import HeaderAnonymous from './HeaderAnonymous';

import Logo from '../../../img/logo.png';
import 'file?name=[name].[ext]!../../../img/logo.png';

class Header extends Component {
  render() {
    const { user, onLogout, onLogoutSuccess } = this.props;

    var header;
    if (user.id) {
      header = <HeaderAuthenticated user={user} onLogout={onLogout} onLogoutSuccess={onLogoutSuccess}/>;
    } else {
      header = <HeaderAnonymous />;
    }

    return (
      <div id="header" className="row">
        <div className="col-md-1">
          <Link to="/">
            <img className="logo" src={Logo}/>
          </Link>
        </div>
        <div className="col-md-11">
          {header}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  onLogoutSuccess: PropTypes.func
}

export default Header;
