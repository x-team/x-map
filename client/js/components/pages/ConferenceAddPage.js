import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as ConferenceActions from '../../actions/ConferenceActions';

/* Components */
import ConferenceForm from '../forms/ConferenceForm';

export class ConferenceAddPage extends Component {
  redirectToConferencesPage() {
    this.props.history.pushState(null, '/conferences');
  }

  render() {
    const { actions, errors } = this.props;

    return (
      <DocumentTitle title="Add conference | X-Map">
        <article id="ConferenceAddPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">Add conference</h2>
            <p className="text-muted">Create a new conference</p>
          </header>

          <div className="card-block">
            <ConferenceForm onSubmit={actions.conferenceCreate} onSuccess={this.redirectToConferencesPage.bind(this)} errors={errors}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

ConferenceAddPage.propTypes = {
  actions: PropTypes.object,
  errors: PropTypes.shape({
    fieldErrors: PropTypes.object,
    globalErrors: PropTypes.array
  }),
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors.conferenceCreate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ConferenceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConferenceAddPage);
