import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as ConferenceActions from '../../actions/ConferenceActions';
import * as UserActions from '../../actions/UserActions';
import assignToEmpty from '../../utils/assign';

/* Components */
import Conference from '../fragments/Conference';

export class ConferencePage extends Component {
  componentDidMount() {
    this.validateProps();
    const { actions, params, conferences } = this.props;
    actions.userActiveChanged(conferences[params.id].users.map(user => user.id));
  }

  componentWillUpdate(props) {
    const { actions, params, conferences } = props;
    actions.userActiveChanged(conferences[params.id].users.map(user => user.id));
  }

  componentDidUpdate() {
    this.validateProps();
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  deleteConference(id) {
    if (confirm(`Are you sure you want to permanently delete this conference?`)) {
      this.props.actions.conferenceDelete(id, this.redirectToConferencesPage.bind(this));
    }
  }

  redirectToConferencesPage() {
    this.props.history.pushState(null, '/conferences');
  }

  validateProps() {
    const { conferences, params, history } = this.props;
    if (!conferences[params.id]) {
      history.pushState(null, '/404');
      return <span/>;
    }
  }

  render() {
    const { conferences, params, isAdmin, actions, users } = this.props;
    const conference = conferences[params.id];

    let editLink;
    let deleteButton;
    if (isAdmin) {
      editLink = (
        <Link className="btn btn-secondary btn-sm" to={`/conference/${conference.id}/edit`}>Edit conference</Link>
      );

      deleteButton = (
        <button className="btn btn-danger btn-sm" type="button"
          onClick={this.deleteConference.bind(this, conference.id)}>Delete</button>
      );
    }

    const canLink = isAdmin;
    const canUnlink = canLink;
    const onLink = actions.conferenceLinkUser;
    const onUnlink = actions.conferenceUnlinkUser;

    return (
      <DocumentTitle title={`Conference: ${conference.name} | X-Map`}>
        <article id="ConferencePage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">{conference.name}</h2>
            <div className="btn-group" role="group" aria-label="Actions menu">
              {editLink}{deleteButton}
            </div>
          </header>

          <Conference conference={conference} canLink={canLink} canUnlink={canUnlink} onLink={onLink} onUnlink={onUnlink} users={users}/>
        </article>
      </DocumentTitle>
    );
  }
}

ConferencePage.propTypes = {
  actions: PropTypes.object,
  conferences: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    conferences: state.conferences,
    users: state.users,
    isAdmin: state.session.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(ConferenceActions, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
