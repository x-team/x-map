import React, { Component, PropTypes } from 'react';

/* Components */
import ProfileDetails from './ProfileDetails';
import ProfileLinkedTeams from './ProfileLinkedTeams';

class Profile extends Component {
  render() {
    const { user } = this.props;

    return (
      <div id="Profile" className="list-group">
        <ProfileDetails user={user}/>
        <ProfileLinkedTeams user={user}/>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Profile;
