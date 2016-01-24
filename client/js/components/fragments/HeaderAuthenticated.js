import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class HeaderAuthenticated extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <h3 className="col-md-10">Hello {user.email}!</h3>
        <div className="col-md-2 pull-right">
          <Button className="btn btn-success pull-right" onClick={this.props.onLogout.bind(this, this.props.onLogoutSuccess)}>Logout</Button>
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
