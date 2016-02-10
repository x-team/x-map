import React, { Component, PropTypes } from 'react';

/* Components */
import ProfileDetails from './ProfileDetails';
import ProfileLinkedTeams from './ProfileLinkedTeams';

class Profile extends Component {
  render() {
    return (
      <div id="Profile" className="list-group">
        <ProfileDetails user={this.props.user}/>
        <ProfileLinkedTeams {...this.props}/>
      </div>
    );
  }
}

Profile.defaultProps = {
  canLink: false,
  canUnlink: false
};

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func
};

export default Profile;
