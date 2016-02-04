import React, { Component, PropTypes } from 'react';
import MiniProfile from './MiniProfile';

class Team extends Component {
  render() {
    const { team } = this.props;

    const userProfiles = [];
    for (const id in team.users) {
      userProfiles.push(<MiniProfile key={id} user={team.users[id]}/>);
    }

    let listOfUserProfiles;
    if (userProfiles.length) {
      listOfUserProfiles = (
        <section>
          <h3>Linked users:</h3>
          {userProfiles}
        </section>
      );
    }

    return (
      <section>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{team.name}</td>
            </tr>
            <tr>
              <th>Summary</th>
              <td>{team.summary}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{team.description}</td>
            </tr>
          </tbody>
        </table>

        {listOfUserProfiles}

      </section>
    );
  }
}

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Team;
