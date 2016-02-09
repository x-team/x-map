import React, { Component, PropTypes } from 'react';

/* Components */
import MiniTeam from './MiniTeam';
import ProfileLinkTeams from './ProfileLinkTeams';

class ProfileLinkedTeams extends Component {
  render() {
    const { user, canUnlink, onUnlink } = this.props;

    const teamProfiles = [];
    for (const id in user.teams) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <button onClick={onUnlink.bind(null, user.teams[id].id, user.id)}>&times;</button>;
      }

      teamProfiles.push(
        <li className="list-group-item" key={id}>
          <MiniTeam team={user.teams[id]}/> {unlinkButton}
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
            <h4 className="panel-title" data-toggle="collapse" data-parent="#ProfileLinkedTeams"
              aria-expanded="true" aria-controls="ProfileLinkedTeamsCollapse"
              href="#ProfileLinkedTeamsCollapse">Teams ({teamProfiles.length})</h4>
          </header>

          <section id="ProfileLinkedTeamsCollapse" className="panel-collapse collapse"
            role="tabpanel" aria-labelledby="ProfileLinkedTeamsHeading">
            {profileLinkedTeams}
            <ProfileLinkTeams {...this.props}/>
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
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  canLink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  canUnlink: PropTypes.bool.isRequired,
  onUnlink: PropTypes.func,
  teams: PropTypes.object
};

export default ProfileLinkedTeams;
