import React, { Component, PropTypes } from 'react';

/* Components */
import MiniTeam from './MiniTeam';
import ProfileLinkTeams from './ProfileLinkTeams';

class ProfileLinkedTeams extends Component {
  onUnlink(teamId, id) {
    if (confirm('Are you sure you want to remove current user from this team?')) {
      this.props.onUnlink(teamId, id);
    }
  }

  render() {
    const { user, canUnlink } = this.props;

    const teamProfiles = [];
    for (const id in user.teams) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-danger" title="Remove user from this team." onClick={this.onUnlink.bind(this, user.teams[id].id, user.id)}>&times;</a>;
      }

      teamProfiles.push(
        <li className="list-group-item" key={id}>
          <MiniTeam team={user.teams[id]}/>
          {unlinkButton}
        </li>
      );
    }


    let profileLinkedTeams = (teamProfiles.length) ?
      <ul className="list-group">{teamProfiles}</ul> :
      <p className="alert text-xs-center">Currently not in any team.</p>;

    return (
      <div id="ProfileLinkedTeams" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" role="tab" id="ProfileLinkedTeamsHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#ProfileLinkedTeams"
            aria-expanded="true" aria-controls="ProfileLinkedTeamsCollapse" href="#ProfileLinkedTeamsCollapse">
            Teams <span className="label label-primary pull-xs-right">{teamProfiles.length}</span>
          </h3>
        </header>

        <section id="ProfileLinkedTeamsCollapse" className="collapse in accordion-body"
          role="tabpanel" aria-labelledby="ProfileLinkedTeamsHeading">
          <ProfileLinkTeams {...this.props}/>
          {profileLinkedTeams}
        </section>
      </div>
    );
  }
}

ProfileLinkedTeams.defaultProps = {
  canUnlink: false
};

ProfileLinkedTeams.propTypes = {
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
  teams: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileLinkedTeams;
