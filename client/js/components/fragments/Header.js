import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/* Assets */
import Logo from '../../../img/logo.png';
import 'file?name=[name].[ext]!../../../img/logo.png';

class Header extends Component {
  render() {
    const { user, onLogout } = this.props;

    let header = null;
    if (user && user.id) {
      header = (
        <header id="Header">

          <nav className="navbar navbar-fixed-top navbar-full navbar-light bg-faded">
            <h2 className="sr-only sr-only-focusable">Name of the page need to go here</h2>

            <Link className="logo navbar-brand" to="/">
              <img className="logo" src={Logo} alt="X-Map"/> X-Map
            </Link>

            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">Profiles</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>

              <li className="nav-item">
                <div className="btn-group">
                  <Link className="btn btn-secondary" to={'/profile/' + user.id}>My profile</Link>
                  <button type="button" className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick={onLogout}>Logout</a>
                  </div>
                </div>
              </li>
            </ul>
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
