import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as TeamActions from '../../actions/TeamActions';

/* Components */
import TeamForm from '../forms/TeamForm';

export class TeamAddPage extends Component {
  redirectToTeamsPage() {
    this.props.history.pushState(null, '/teams');
  }

  render() {
    const { actions, errors } = this.props;

    return (
      <DocumentTitle title="Add team | X-Map">
        <article id="TeamAddPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

          <header className="card-header">
            <h2 className="card-title">Add team</h2>
            <p className="text-muted">Create a new team</p>
          </header>

          <div className="card-block">
            <TeamForm onSubmit={actions.teamCreate} onSuccess={this.redirectToTeamsPage.bind(this)} errors={errors}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

TeamAddPage.propTypes = {
  actions: PropTypes.object,
  errors: PropTypes.shape({
    fieldErrors: PropTypes.object,
    globalErrors: PropTypes.array
  }),
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors.teamCreate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TeamActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAddPage);
