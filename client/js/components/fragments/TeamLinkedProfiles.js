import React, { Component, PropTypes } from 'react';

/* Components */
import MiniProfile from './MiniProfile';
import TeamLinkProfiles from './TeamLinkProfiles';

class TeamLinkedProfiles extends Component {
  onUnlink(id, userId) {
    if (confirm(`Are you sure you want to remove this user from current team?`)) {
      this.props.onUnlink(id, userId);
    }
  }

  render() {
    const { team, canUnlink } = this.props;

    const userProfiles = [];
    for (const id in team.users) {
      let unlinkButton = null;
      if (canUnlink) {
        unlinkButton = <a className="close btn btn-sm btn-danger" title="Remove this user from current team." onClick={this.onUnlink.bind(this, team.id, team.users[id].id)}>&times;</a>;
      }

      userProfiles.push(
        <li className="list-group-item" key={id}>
          <MiniProfile user={team.users[id]}/>
          {unlinkButton}
        </li>
      );
    }

    const teamLinkedProfiles = (userProfiles.length) ?
      <ul className="list-group">{userProfiles}</ul> :
      <p className="alert text-xs-center">Currently nobody in this team.</p>;

    return (
      <div id="TeamLinkedProfiles" className="accordion" role="tablist" aria-multiselectable="true">
        <header className="accordion-header" role="tab" id="TeamLinkedProfilesHeading">
          <h3 className="accordion-title" data-toggle="collapse" data-parent="#TeamLinkedProfiles"
            aria-expanded="true" aria-controls="TeamLinkedProfilesCollapse"
            href="#TeamLinkedProfilesCollapse">Users <span className="label label-primary pull-xs-right">{userProfiles.length}</span></h3>
        </header>

        <section id="TeamLinkedProfilesCollapse" className="collapse in accordion-body"
          role="tabpanel" aria-labelledby="TeamLinkedProfilesHeading">
          <TeamLinkProfiles {...this.props}/>
          {teamLinkedProfiles}
        </section>
      </div>
    );
  }
}

TeamLinkedProfiles.propTypes = {
  canLink: PropTypes.bool.isRequired,
  canUnlink: PropTypes.bool.isRequired,
  onLink: PropTypes.func,
  onUnlink: PropTypes.func,
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.object
};

export default TeamLinkedProfiles;
