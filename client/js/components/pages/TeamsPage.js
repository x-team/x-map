import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TeamActions from '../../actions/TeamActions';
import * as UserActions from '../../actions/UserActions';
import { Link } from 'react-router';
import MiniTeam from '../fragments/MiniTeam';
import assignToEmpty from '../../utils/assign';

class TeamsPage extends Component {
  markTeamAsActive(id) {
    const { actions, teams } = this.props;
    actions.userActiveChanged(teams[id].users.map(user => user.id));
  }

  markTeamAsInactive() {
    this.props.actions.userActiveChanged([]);
  }

  render() {
    const { teams, isAdmin } = this.props;

    const teamProfiles = [];
    for (const id in teams) {
      teamProfiles.push(
        <div key={id} onMouseOver={this.markTeamAsActive.bind(this, id)} onMouseOut={this.markTeamAsInactive.bind(this)}>
          <MiniTeam team={teams[id]}/>
        </div>
      );
    }

    let teamsList;
    if (teamProfiles.length) {
      teamsList = (
        <section>
          {teamProfiles}
        </section>
      );
    }

    let addLink = <span/>;
    if (isAdmin) {
      addLink = <Link to="/team/new">Add team</Link>;
    }

    return (
      <div className="panel">
        <article id="teamProfiles">
          <header>
            <h2>Teams</h2>
          </header>

          {teamsList}

          {addLink}

        </article>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  teams: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};

TeamsPage.defaultProps = {
  isAdmin: false
};

function mapStateToProps(state) {
  return {
    teams: state.teams,
    isAdmin: state.session.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(TeamActions, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
