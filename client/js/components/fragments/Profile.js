import React, { Component, PropTypes } from 'react';

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.user;
  }

  render() {
    const { user } = this.props;

    return (
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
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Profile;
