import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

class HeaderAuthenticated extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <nav className="navigation">
          <Link className="button" to="/profiles">Profiles</Link>
          <Link className="button" to={ '/profile/' + user.id }>My profile</Link>
          <button className="button" onClick={ this.props.onLogout.bind(this, this.props.onLogoutSuccess) }>Logout</button>
        </nav>
      </div>
    );
  }
}

HeaderAuthenticated.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};

export default HeaderAuthenticated;
