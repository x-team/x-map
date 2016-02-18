import React, { Component, PropTypes } from 'react';

/* Components */
import MiniTeam from './MiniTeam';
import ProfileLinkTeams from './ProfileLinkTeams';

class ProfileLinkedTeams extends Component {
  onUnlink(teamId, id) {
    if (confirm(`Are you sure you want to remove current user from this team?`)) {
      this.props.onUnlink(teamId, id);
    }
  }

  render() {
    const { user, canUnlink } = this.props;

    const teamProfiles = [];
    for (const id in user.teams) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-secondary" onClick={this.onUnlink.bind(this, user.teams[id].id, user.id)}>&times;</a>;
      }

      teamProfiles.push(
        <li className="list-group-item" key={id}>
          {unlinkButton}
          <MiniTeam team={user.teams[id]}/>
        </li>
      );
    }

    let profileLinkedTeams = (<i className="text-muted">Currently not in any team.</i>);
    if (teamProfiles.length) {
      profileLinkedTeams = (
        <ul className="list-group list-group-flush">
          {teamProfiles}
        </ul>
      );
    }

    return (
      <div id="ProfileLinkedTeams" className="accordion list-group-item" role="tablist" aria-multiselectable="true">
        <section className="panel panel-default">
          <header className="panel-heading" role="tab" id="ProfileLinkedTeamsHeading">
            <h4 className="panel-title"
              data-toggle="collapse"
              data-parent="#ProfileLinkedTeams"
              aria-expanded="true"
              aria-controls="ProfileLinkedTeamsCollapse"
              href="#ProfileLinkedTeamsCollapse">
              Teams ({teamProfiles.length})
            </h4>
          </header>

          <section id="ProfileLinkedTeamsCollapse"
            className="panel-collapse collapse"
            role="tabpanel"
            aria-labelledby="ProfileLinkedTeamsHeading">
            <ProfileLinkTeams {...this.props}/>
            {profileLinkedTeams}
          </section>
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
