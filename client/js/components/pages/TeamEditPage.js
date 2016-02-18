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

export class TeamEditPage extends Component {
  componentDidMount() {
    this.validateProps();
    const { actions, params, teams } = this.props;
    actions.userActiveChanged(teams[params.id].users.map(user => user.id));
  }

  componentWillUpdate(props) {
    const { actions, params, teams } = props;
    actions.userActiveChanged(teams[params.id].users.map(user => user.id));
  }

  componentDidUpdate() {
    this.validateProps();
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  redirectToTeamPage(id) {
    this.props.history.pushState(null, '/team/' + id);
  }

  validateProps() {
    const { teams, params, history } = this.props;
    if (!teams[params.id]) {
      history.pushState(null, '/404');
      return <span/>;
    }
  }

  render() {
    const { actions, errors, teams, params } = this.props;
    const team = teams[params.id];

    return (
      <DocumentTitle title={`Edit team: ${team.name} | X-Map`}>
        <article id="TeamEditPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary">&times;</Link>

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
  actions: PropTypes.object,
  errors: PropTypes.shape({
    fieldErrors: PropTypes.object,
    globalErrors: PropTypes.array
  }),
  history: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  teams: PropTypes.object.isRequired
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
