import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniProfile extends Component {
  render() {
    const { user } = this.props;

    let avatar = null;
    if (user.avatar) {
      avatar = (
        <span className="pull-xs-left">
          <img className="img-circle" src={user.avatar} alt={`${user.firstName} ${user.lastName}`}/>
        </span>
      );
    }

    let contact = user.email;
    if (user.slackId) {
      contact = 'Slack: @' + user.slackId;
    }

    return (
      <Link className="miniProfile list-group-item clearfix" to={`/profile/${user.id}`} title={`View ${user.firstName}'s profile page`}>
        {avatar}
        <h4 className="list-group-item-heading">{user.firstName} {user.lastName}</h4>
        <p className="list-group-item-text">{contact}</p>
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
