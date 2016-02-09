import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniProfile extends Component {
  render() {
    const { user } = this.props;

    let avatar = null;
    if (user.avatar) {
      avatar = (
        <span className="media-left">
          <img className="media-object img-circle" src={user.avatar} alt={`${user.firstName} ${user.lastName}`}/>
        </span>
      );
    }

    let contact = user.email;
    if (user.slackId) {
      contact = 'Slack: @' + user.slackId;
    }

    return (
      <Link className="miniProfile media" to={`/profile/${user.id}`} title={`${user.firstName} ${user.lastName}`}>
          {avatar}
        <span className="media-body">
          <h4 className="media-heading">{user.firstName} {user.lastName}</h4>
          <p className="text-muted">{contact}</p>
        </span>
      </Link>
    );
  }
}

MiniProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniProfile;
