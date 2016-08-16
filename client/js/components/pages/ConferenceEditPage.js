import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { getConferenceMarker } from '../../utils/markers';

import * as ConferenceActions from '../../actions/ConferenceActions';
import * as UserActions from '../../actions/UserActions';

/* Assets */
import confDefaultMarker from '../../../img/xteam_marker.png';

/* Components */
import ConferenceForm from '../forms/ConferenceForm';

export class ConferenceEditPage extends Component {
  componentDidMount() {
    this.validateProps();
    const { actions, params, conferences } = this.props;
    const conference = conferences[params.id];
    actions.userActiveChanged(conference.users.map(user => user.id));
    this.renderConferenceMarker(conference);
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
    this.marker.setVisible(false);
  }

  redirectToConferencePage(id) {
    this.props.history.pushState(null, '/conference/' + id);
  }

  validateProps() {
    const { conferences, params, history } = this.props;
    if (!conferences[params.id]) {
      history.pushState(null, '/404');
      return <span/>;
    }
  }

  renderConferenceMarker(conference) {
    this.marker = getConferenceMarker(conference, confDefaultMarker);
  }

  render() {
    const { actions, errors, conferences, params } = this.props;
    const conference = conferences[params.id];

    return (
      <DocumentTitle title={`Edit conference: ${conference.name} | X-Map`}>
        <article id="ConferenceEditPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">Edit conference</h2>
            <Link className="text-muted" to={`/conference/${conference.id}`} title={`Go to ${conference.name} conference page`}>{conference.name}</Link>
          </header>

          <div className="card-block">
            <ConferenceForm conference={conference} onSubmit={actions.conferenceUpdate}
              onSuccess={this.redirectToConferencePage.bind(this, params.id)} errors={errors}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

ConferenceEditPage.propTypes = {
  actions: PropTypes.object,
  conferences: PropTypes.object.isRequired,
  errors: PropTypes.shape({
    fieldErrors: PropTypes.object,
    globalErrors: PropTypes.array
  }),
  history: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  usersVisible: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    conferences: state.conferences,
    errors: state.errors.conferenceUpdate,
    usersVisible: state.users.visible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ConferenceActions,
      ...UserActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceEditPage);
