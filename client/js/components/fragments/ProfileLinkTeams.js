import React, { Component, PropTypes } from 'react';
import assignToEmpty from '../../utils/assign';

class ProfileLinkTeams extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTeamId: null
    };
  }

  onInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  onLink(id, teamId) {
    this.setState({selectedTeamId: null});
    this.props.onLink(teamId, id);
  }

  render() {
    const { teams, user, canLink } = this.props;

    if (!canLink) {
      return null;
    }

    const unlinkedTeams = assignToEmpty(teams);
    user.teams.forEach(team => {
      delete unlinkedTeams[team.id];
    });

    const unlinkedTeamsList = [];
    for (const id in unlinkedTeams) {
      unlinkedTeamsList.push(unlinkedTeams[id]);
    }

    if (!unlinkedTeamsList.length) {
      return null;
    }

    return (
      <fieldset className="form-group">
        <label>Add user to team:</label>
        <span className="input-group">
          <select className="form-control" onChange={this.onInputChange.bind(this, 'selectedTeamId')} defaultValue={null}>
            <option>Select team:</option>
            {unlinkedTeamsList.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <span className="input-group-btn">
            <button className="btn btn-secondary" disabled={!this.state.selectedTeamId}
              onClick={this.onLink.bind(this, user.id, this.state.selectedTeamId)}>Add</button>
          </span>
        </span>
      </fieldset>
    );
  }
}

ProfileLinkTeams.propTypes = {
  canLink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  teams: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileLinkTeams;
