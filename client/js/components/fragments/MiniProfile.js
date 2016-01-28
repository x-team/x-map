import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniProfile extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        {user.email}
        <Link to={`/profile/${user.id}`}>View</Link>
      </div>
    );
  }
}

MiniProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniProfile;
