import React, { Component, PropTypes } from 'react';

/* Components */
import ConferenceDetails from './ConferenceDetails';
import ConferenceLinkedProfiles from './ConferenceLinkedProfiles';

class Conference extends Component {
  render() {
    return (
      <div id="Conference" className="list-group">
        <ConferenceDetails conference={this.props.conference}/>
        <ConferenceLinkedProfiles {...this.props}/>
      </div>
    );
  }
}

Conference.defaultProps = {
  canLink: false,
  canUnlink: false,
  users: {}
};

Conference.propTypes = {
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  conference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
  users: PropTypes.object
};

export default Conference;
