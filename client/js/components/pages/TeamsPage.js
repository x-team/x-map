import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import R from 'ramda';


import * as TeamActions from '../../actions/TeamActions';
import * as UserActions from '../../actions/UserActions';
import assignToEmpty from '../../utils/assign';
import { sortTeamsByName } from '../../utils/common';

/* Components */
import MiniTeam from '../fragments/MiniTeam';

export class TeamsPage extends Component {
  markTeamAsActive(id) {
    const { actions, teams } = this.props;
    actions.userActiveChanged(teams[id].users.map(user => user.id));
  }

  markTeamAsInactive() {
    this.props.actions.userActiveChanged([]);
  }

  renderTeam(team) {
    return (
      <li className="list-group-item" key={team.id} onMouseOver={this.markTeamAsActive.bind(this, team.id)} onMouseOut={this.markTeamAsInactive.bind(this)}>
        <MiniTeam team={team}/>
      </li>
    );
  }

  render() {
    const teams = R.compose(
      R.map((team) => this.renderTeam(team)),
      R.sort(sortTeamsByName),
      R.values
    )(this.props.teams);

    return (
      <DocumentTitle title="Teams | X-Map">
        <article id="TeamsPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">Teams</h2>
            <p className="text-muted">Listing all teams</p>
            {(() => this.props.isAdmin ?
              (<div className="btn-group" role="group" aria-label="Actions menu">
                <Link className="btn btn-secondary btn-sm" to="/team/new">Add team</Link>
              </div>) : ''
            )()}
          </header>
          {(() => teams.length ?
            <ul className="list-group list-group-flush">{teams}</ul> :
            <p className="alert">No teams yet.</p>
          )()}
        </article>
      </DocumentTitle>
    );
  }
}

TeamsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  teams: PropTypes.object.isRequired
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
