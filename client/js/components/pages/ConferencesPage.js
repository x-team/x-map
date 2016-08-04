import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import { getConferenceMarker } from '../../utils/markers';
import R from 'ramda';

import * as ConferenceActions from '../../actions/ConferenceActions';
import sortConferencesByName from '../../utils/common';

/* Assets */
import confDefaultMarker from '../../../img/xteam_marker.png';

/* Components */
import MiniConference from '../fragments/MiniConference';

export class ConferencesPage extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentWillMount() {
    this.renderConferencesMarkers(this.props.conferences);
  }

  componentWillUnmount() {
    this.setConferencesMarkersVisibility(this.markers, false);
  }

  setConferencesMarkersVisibility(markers, visibility) {
    R.forEach((marker) => marker.setVisible(visibility), markers);
  }

  markConferenceAsActive(id) {
    this.props.actions.conferenceActiveChanged([id]);
  }

  markConferenceAsInactive() {
    this.props.actions.conferenceActiveChanged([]);
  }

  renderConference(conference) {
    return (
      <li className="list-group-item" key={conference.id}
          onMouseOver={this.markConferenceAsActive.bind(this, conference.id)} onMouseOut={this.markConferenceAsInactive.bind(this)}>
        <MiniConference conference={conference}/>
      </li>
    );
  }

  renderConferencesMarkers(conferences) {
    R.forEach((conference) => {
      this.markers.push(getConferenceMarker(conference, confDefaultMarker));
    }, R.values(conferences));
  }

  render() {
    const conferences = R.compose(
      R.map((conference) => this.renderConference(conference)),
      R.sort(sortConferencesByName),
      R.values
    )(this.props.conferences);

    return (
      <DocumentTitle title="Conferences | X-Map">
        <article id="ConferencesPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">Conferences</h2>
            <p className="text-muted">Listing all conferences</p>
            {(() => this.props.isAdmin ?
                (<div className="btn-group" role="group" aria-label="Actions menu">
                  <Link className="btn btn-secondary btn-sm" to="/conference/new">Add conference</Link>
                </div>) : ''
            )()}
          </header>
          {(() => conferences.length ?
            <ul className="list-group list-group-flush">{conferences}</ul> :
            <p className="alert">No conferences yet.</p>
          )()}
        </article>
      </DocumentTitle>
    );
  }
}

ConferencesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  conferences: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  params: PropTypes.object
};

ConferencesPage.defaultProps = {
  isAdmin: false
};

function mapStateToProps(state) {
  return {
    conferences: state.conferences,
    isAdmin: state.session.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ConferenceActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConferencesPage);
