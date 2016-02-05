import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as TeamActions from '../../actions/TeamActions';
import * as UserActions from '../../actions/UserActions';
import assignToEmpty from '../../utils/assign';

/* Components */
import TeamForm from '../forms/TeamForm';

class TeamEditPage extends Component {
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

  redirectToTeamPage(id) {
    this.props.history.pushState(null, '/team/' + id);
  }

  render() {
    const { actions, errors, teams, params, history } = this.props;

    const team = teams[params.id];
    if (!team) {
      history.pushState(null, '/404');
      return <span/>;
    }

    return (
      <DocumentTitle title={`Edit team: ${team.name} | X-Map`}>
        <article id="TeamEditPage" className="page card">
          <Link to="/" className="close btn btn-secondary">&times;</Link>

          <header className="card-header">
            <h3 className="card-title">{team.name}</h3>
            <p className="card-subtitle">Edit team</p>
            <Link className="text-muted" to={`/team/${team.id}`} title={`Go to ${team.name} team page`}>#{team.id}</Link>
          </header>

          <div className="card-block">
            <TeamForm team={team} onSubmit={actions.teamUpdate}
              onSuccess={this.redirectToTeamPage.bind(this, params.id)} errors={errors}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

TeamEditPage.propTypes = {
  teams: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  })
};

function mapStateToProps(state) {
  return {
    teams: state.teams,
    errors: state.errors.teamUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(TeamActions, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditPage);
