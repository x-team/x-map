import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as TeamActions from '../../actions/TeamActions';
import * as UserActions from '../../actions/UserActions';
import assignToEmpty from '../../utils/assign';

/* Components */
import MiniTeam from '../fragments/MiniTeam';

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
        <li className="list-group-item" key={id} onMouseOver={this.markTeamAsActive.bind(this, id)}
             onMouseOut={this.markTeamAsInactive.bind(this)}>
          <MiniTeam team={teams[id]}/>
        </li>
      );
    }

    if (!teamProfiles.length) {
      teamProfiles.push(<p className="alert">No teams yet.</p>);
    }

    let adminMenu = null;
    if (isAdmin) {
      adminMenu = (
        <div className="btn-group" role="group" aria-label="Actions menu">
          <Link className="btn btn-secondary btn-sm" to="/team/new">Add team</Link>
        </div>
      );
    }

    return (
      <DocumentTitle title="Teams | X-Map">
        <article id="TeamsPage" className="page card">
          <Link to="/" className="close btn btn-secondary">&times;</Link>

          <header className="card-header">
            <h3 className="card-title">Teams</h3>
            <p className="text-muted">Listing all teams</p>
            {adminMenu}
          </header>

          <ul className="list-group list-group-flush">
            {teamProfiles}
          </ul>
        </article>
      </DocumentTitle>
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
