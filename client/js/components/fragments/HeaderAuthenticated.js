import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HeaderAuthenticated extends Component {
  render() {
    const { user, onLogout } = this.props;

    return (
      <div>
        <nav className="navigation">
          <Link className="button" to="/profiles">Profiles</Link>
          <Link className="button" to="/teams">Teams</Link>
          <Link className="button" to={'/profile/' + user.id}>My profile</Link>
          <button className="button" onClick={onLogout}>Logout</button>
        </nav>
      </div>
    );
  }
}

HeaderAuthenticated.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  onLogout: PropTypes.func.isRequired
};

export default HeaderAuthenticated;
