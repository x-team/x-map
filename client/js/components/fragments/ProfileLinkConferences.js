import React, { Component, PropTypes } from 'react';
import assignToEmpty from '../../utils/assign';

class ProfileLinkConferences extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedConferenceId: null
    };
  }

  onInputChange(field, e) {
    this.setState({[field]: e.target.value});
  }

  onLink(id, conferenceId) {
    this.setState({selectedConferenceId: null});
    this.props.onLink(conferenceId, id);
  }

  render() {
    const { conferences, user, canLink } = this.props;

    if (!canLink) {
      return null;
    }

    const unlinkedConferences = assignToEmpty(conferences);
    user.events.forEach(conference => {
      delete unlinkedConferences[conference.id];
    });

    const unlinkedConferencesList = [];
    for (const id in unlinkedConferences) {
      unlinkedConferencesList.push(unlinkedConferences[id]);
    }

    if (!unlinkedConferencesList.length) {
      return null;
    }

    return (
      <fieldset className="form-group">
        <label>Add user to conference:</label>
        <span className="input-group">
          <select className="form-control" onChange={this.onInputChange.bind(this, 'selectedConferenceId')} defaultValue={null}>
            <option>Select conference:</option>
            {unlinkedConferencesList.map(conference => <option key={conference.id} value={conference.id}>{conference.name}</option>)}
          </select>
          <span className="input-group-btn">
            <button className="btn btn-secondary" disabled={!this.state.selectedConferenceId}
              onClick={this.onLink.bind(this, user.id, this.state.selectedConferenceId)}>Add</button>
          </span>
        </span>
      </fieldset>
    );
  }
}

ProfileLinkConferences.propTypes = {
  canLink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  conferences: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileLinkConferences;
