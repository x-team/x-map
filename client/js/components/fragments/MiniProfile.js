import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import DefaultAvatar from '../../../img/avatar.jpg';
import 'file?name=[name].[ext]!../../../img/avatar.jpg';

class MiniProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <span>
        <Link to={`/profile/${user.id}`} title={'${user.firstName} ${user.lastName}'}>
          <img src={user.avatar || DefaultAvatar} alt={'${user.firstName} ${user.lastName}'}/>
          <p>{user.firstName} {user.lastName}</p>
        </Link>
      </span>
    );
  }
}

MiniProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniProfile;
