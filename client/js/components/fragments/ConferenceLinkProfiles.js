import React, { Component, PropTypes } from 'react';
import assignToEmpty from '../../utils/assign';

class ConferenceLinkProfiles extends Component {
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
    const { conference, users, canLink } = this.props;

    if (!canLink) {
      return null;
    }

    const unlinkedProfiles = assignToEmpty(users);
    conference.users.forEach(user => {
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
      <fieldset className="form-group">
        <label>Add users:</label>
        <span className="input-group">
          <select className="form-control" onChange={this.onInputChange.bind(this, 'selectedUserId')} defaultValue={null}>
            <option>Select user:</option>
            {unlinkedProfilesList.map(user => <option key={user.id}
              value={user.id}>{user.firstName} {user.lastName}</option>)}
          </select>
          <span className="input-group-btn">
            <button className="btn btn-secondary" disabled={!this.state.selectedUserId}
              onClick={this.onLink.bind(this, conference.id, this.state.selectedUserId)}>Add</button>
          </span>
        </span>
      </fieldset>
    );
  }
}

ConferenceLinkProfiles.propTypes = {
  canLink: PropTypes.bool.isRequired,
  conference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onLink: PropTypes.func,
  users: PropTypes.object
};

export default ConferenceLinkProfiles;
