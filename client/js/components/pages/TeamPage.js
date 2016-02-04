import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Team from '../fragments/Team';
import * as TeamActions from '../../actions/TeamActions';
import * as UserActions from '../../actions/UserActions';
import assignToEmpty from '../../utils/assign';
import DocumentTitle from 'react-document-title';

class TeamPage extends Component {
  componentDidMount() {
    const { actions, params, teams } = this.props;
    actions.userActiveChanged(teams[params.id].users.map(user => user.id));
  }

  componentWillUpdate(props) {
    const { actions, params, teams } = props;
    actions.userActiveChanged(teams[params.id].users.map(user => user.id));
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  deleteTeam(id) {
    this.props.actions.teamDelete(id, this.redirectToTeamsPage.bind(this));
  }

  redirectToTeamsPage() {
    this.props.history.pushState(null, '/teams');
  }

  render() {
    const { teams, history, params, isAdmin } = this.props;

    const team = teams[params.id];
    if (!team) {
      history.pushState(null, '/404');
      return <span/>;
    }

    let editLink;
    let deleteButton;
    if (isAdmin) {
      editLink = <Link to={`/team/${team.id}/edit`}>Edit team</Link>;
      deleteButton =
        <button type="button" className="button" onClick={this.deleteTeam.bind(this, team.id)}>Delete</button>;
    }

    return (
      <DocumentTitle title={`Team: ${team.name} | X-Map`}>
        <div className="panel">
          <article id="teamProfile">
            <header>
              <h2>Team #{team.id}</h2>
            </header>

            <section>
              <Team team={team}/>
            </section>

            {editLink}

            {deleteButton}

          </article>
        </div>
      </DocumentTitle>
    );
  }
}

TeamPage.propTypes = {
  teams: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  actions: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
