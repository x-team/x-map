import React, { Component, PropTypes } from 'react';

/* Components */
import TeamDetails from './TeamDetails';
import TeamLinkedProfiles from './TeamLinkedProfiles';

class Team extends Component {
  render() {
    const { team } = this.props;

    return (
      <div id="Team" className="list-group">
        <TeamDetails team={team}/>
        <TeamLinkedProfiles team={team}/>
      </div>
    );
  }
}

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Team;
