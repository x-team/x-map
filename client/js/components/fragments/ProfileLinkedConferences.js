import React, { Component, PropTypes } from 'react';

/* Components */
import MiniConference from './MiniConference';
import ProfileLinkConferences from './ProfileLinkConferences';

class ProfileLinkedConferences extends Component {
  onUnlink(conferenceId, id) {
    if (confirm('Are you sure you want to remove current user from this conference?')) {
      this.props.onUnlink(conferenceId, id);
    }
  }

  render() {
    const { user, canUnlink } = this.props;

    const conferenceProfiles = [];
    for (const id in user.events) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-danger" title="Remove user from this conference." onClick={this.onUnlink.bind(this, user.events[id].id, user.id)}>&times;</a>;
      }

      conferenceProfiles.push(
        <li className="list-group-item" key={id}>
          <MiniConference conference={user.events[id]}/>
          {unlinkButton}
        </li>
      );
    }

    const profileLinkedConferences = (conferenceProfiles.length) ?
      <ul className="list-group">{conferenceProfiles}</ul> :
      <p className="alert text-xs-center">Currently not in any conference.</p>;

    return (
      <div id="ProfileLinkedConferences" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" role="tab" id="ProfileLinkedConferencesHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#ProfileLinkedConferences"
            aria-expanded="true" aria-controls="ProfileLinkedConferencesCollapse" href="#ProfileLinkedConferencesCollapse">
            Conferences <span className="label label-primary pull-xs-right">{conferenceProfiles.length}</span>
          </h3>
        </header>

        <section id="ProfileLinkedConferencesCollapse" className="collapse in accordion-body"
          role="tabpanel" aria-labelledby="ProfileLinkedConferencesHeading">
          <ProfileLinkConferences {...this.props}/>
          {profileLinkedConferences}
        </section>
      </div>
    );
  }
}

ProfileLinkedConferences.defaultProps = {
  canUnlink: false
};

ProfileLinkedConferences.propTypes = {
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
  conferences: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileLinkedConferences;
