import React, { Component, PropTypes } from 'react';
import MiniTeam from './MiniTeam';

class Profile extends Component {
  render() {
    const { user } = this.props;

    const teamProfiles = [];
    for (const id in user.teams) {
      teamProfiles.push(<MiniTeam key={id} team={user.teams[id]}/>);
    }

    let listOfTeamProfiles;
    if (teamProfiles.length) {
      listOfTeamProfiles = (
        <section>
          <h3>Linked teams:</h3>
          {teamProfiles}
        </section>
      );
    }

    return (
      <section>
        <table>
          <tbody>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>First name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Skype ID</th>
            <td>{user.skypeId}</td>
          </tr>
          <tr>
            <th>Slack ID</th>
            <td>{user.slackId}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>{user.website}</td>
          </tr>
          <tr>
            <th>Nationality</th>
            <td>{user.nationality}</td>
          </tr>
          <tr>
            <th>About me</th>
            <td>{user.aboutMe}</td>
          </tr>
          <tr>
            <th>Is admin</th>
            <td>{user.isAdmin ? 'Y' : 'N'}</td>
          </tr>
          </tbody>
        </table>

        {listOfTeamProfiles}

      </section>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Profile;
