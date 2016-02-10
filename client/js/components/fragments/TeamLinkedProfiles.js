import React, { Component, PropTypes } from 'react';

/* Components */
import MiniProfile from './MiniProfile';
import TeamLinkProfiles from './TeamLinkProfiles';

class TeamLinkedProfiles extends Component {
  render() {
    const { team, canUnlink, onUnlink } = this.props;

    const userProfiles = [];
    for (const id in team.users) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-secondary" onClick={onUnlink.bind(null, team.id, team.users[id].id)}>&times;</a>;
      }

      userProfiles.push(
        <li className="list-group-item" key={id}>
          {unlinkButton}
          <MiniProfile user={team.users[id]}/>
        </li>
      );
    }

    let teamLinkedProfiles = (<i className="text-muted">Currently nobody in this team.</i>);
    if (userProfiles.length) {
      teamLinkedProfiles = (
        <ul className="list-group list-group-flush">
          {userProfiles}
        </ul>
      );
    }

    return (
      <div id="TeamLinkedProfiles" className="accordion list-group-item" role="tablist" aria-multiselectable="true">
        <section className="panel panel-default">
          <header className="panel-heading" role="tab" id="TeamLinkedProfilesHeading">
            <h4 className="panel-title" data-toggle="collapse" data-parent="#TeamLinkedProfiles"
              aria-expanded="true" aria-controls="TeamLinkedProfilesCollapse"
              href="#TeamLinkedProfilesCollapse">Users ({userProfiles.length})</h4>
          </header>

          <section id="TeamLinkedProfilesCollapse" className="panel-collapse collapse"
            role="tabpanel" aria-labelledby="TeamLinkedProfilesHeading">
            <TeamLinkProfiles {...this.props}/>
            {teamLinkedProfiles}
          </section>
        </section>
      </div>
    );
  }
}

TeamLinkedProfiles.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  canLink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  canUnlink: PropTypes.bool.isRequired,
  onUnlink: PropTypes.func,
  users: PropTypes.object
};

export default TeamLinkedProfiles;
