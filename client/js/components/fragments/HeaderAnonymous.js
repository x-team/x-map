import React, { Component } from 'react';
import { Link } from 'react-router';

class HeaderAnonymous extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-push-8">
          <Link className="btn btn-success col-md-5" to="/login">Login</Link>
          <Link className="btn btn-success col-md-5 col-md-push-1" to="/register">Register</Link>
        </div>
      </div>
    );
  }
}

export default HeaderAnonymous;
