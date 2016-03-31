import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/* Assets */
import Logo from '../../../img/logo.png';

/* CSS Module */
import styles from '../../../css/components/fragments/Header.css';

class Header extends Component {
  render() {
    const { user, onLogout } = this.props;

    let header = null;
    if (user && user.id) {
      header = (
        <header id="Header" className={styles.header}>

          <nav className="navbar navbar-fixed-top navbar-full navbar-light bg-faded">
            <Link className="logo navbar-brand" to="/">
              <h2><img className="logo" src={Logo} alt="X-Map"/></h2>
            </Link>

            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="btn btn-primary" to="/profiles">Profiles</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/teams">Teams</Link>
              </li>

              <li className="nav-item">
                <div className="btn-group">
                  <Link className="btn btn-primary" to={'/profile/' + user.id}>My profile</Link>
                  <button type="button" className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
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
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Header;
