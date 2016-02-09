import React, { Component, PropTypes } from 'react';

/* Components */
import TeamDetails from './TeamDetails';
import TeamLinkedProfiles from './TeamLinkedProfiles';

class Team extends Component {
  render() {
    return (
      <div id="Team" className="list-group">
        <TeamDetails team={this.props.team}/>
        <TeamLinkedProfiles {...this.props}/>
      </div>
    );
  }
}

Team.defaultProps = {
  canLink: false,
  canUnlink: false
};

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func
};

export default Team;
