import React, { Component, PropTypes } from 'react';
import assignToEmpty from '../../utils/assign';

class TeamLinkProfiles extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedUserId: null
    };
  }

  onInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  onLink(id, userId) {
    this.setState({selectedUserId: null});
    this.props.onLink(id, userId);
  }

  render() {
    const { team, users, canLink } = this.props;

    if (!canLink) {
      return null;
    }

    const unlinkedProfiles = assignToEmpty(users);
    team.users.forEach(user => {
      delete unlinkedProfiles[user.id];
    });

    const unlinkedProfilesList = [];
    for (const id in unlinkedProfiles) {
      unlinkedProfilesList.push(unlinkedProfiles[id]);
    }

    if (!unlinkedProfilesList.length) {
      return null;
    }

    return (
      <span>
        <p>Add users:</p>
        <select onChange={this.onInputChange.bind(this, 'selectedUserId')} defaultValue={null}>
          <option>Select user:</option>
          {unlinkedProfilesList.map(user => <option key={user.id}
                                                    value={user.id}>{user.firstName} {user.lastName}</option>)}
        </select>
        <button disabled={!this.state.selectedUserId} onClick={this.onLink.bind(this, team.id, this.state.selectedUserId)}>
          Add
        </button>
      </span>
    );
  }
}

TeamLinkProfiles.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.object,
  canLink: PropTypes.bool.isRequired,
  onLink: PropTypes.func
};

export default TeamLinkProfiles;
