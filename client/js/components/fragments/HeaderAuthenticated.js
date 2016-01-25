import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

class HeaderAuthenticated extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-md-6 col-md-push-6">
          <Link className="btn btn-success col-md-3 col-md-push-1" to="/profiles">Profiles</Link>
          <Link className="btn btn-success col-md-3 col-md-push-2" to={`/profile/${user.id}`}>My profile</Link>
          <Button className="btn btn-danger col-md-3 col-md-push-3" onClick={this.props.onLogout.bind(this, this.props.onLogoutSuccess)}>Logout</Button>
        </div>
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
