import React, { Component, PropTypes } from 'react';

/* Components */
import MiniProfile from './MiniProfile';
import ConferenceLinkProfiles from './ConferenceLinkProfiles';

class ConferenceLinkedProfiles extends Component {
  onUnlink(id, userId) {
    if (confirm(`Are you sure you want to remove this user from current conference?`)) {
      this.props.onUnlink(id, userId);
    }
  }

  render() {
    const { conference, canUnlink } = this.props;

    const userProfiles = [];
    for (const id in conference.users) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-danger" title="Remove this user from current conference." onClick={this.onUnlink.bind(this, conference.id, conference.users[id].id)}>&times;</a>;
      }

      userProfiles.push(
        <li className="list-group-item" key={id}>
          <MiniProfile user={conference.users[id]}/>
          {unlinkButton}
        </li>
      );
    }

    const conferenceLinkedProfiles = (userProfiles.length) ?
      <ul className="list-group">{userProfiles}</ul> :
      <p className="alert text-xs-center">Currently nobody in this conference.</p>;

    return (
      <div id="ConferenceLinkedProfiles" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" role="tab" id="ConferenceLinkedProfilesHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#ConferenceLinkedProfiles"
            aria-expanded="true" aria-controls="ConferenceLinkedProfilesCollapse"
            href="#ConferenceLinkedProfilesCollapse">Users <span className="label label-primary pull-xs-right">{userProfiles.length}</span></h3>
        </header>

        <section id="ConferenceLinkedProfilesCollapse" className="collapse in accordion-body"
          role="tabpanel" aria-labelledby="ConferenceLinkedProfilesHeading">
          <ConferenceLinkProfiles {...this.props}/>
          {conferenceLinkedProfiles}
        </section>
      </div>
    );
  }
}

ConferenceLinkedProfiles.propTypes = {
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
  conference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.object
};

export default ConferenceLinkedProfiles;
