import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TeamActions from '../../actions/TeamActions';
import TeamForm from '../forms/TeamForm';

class TeamAddPage extends Component {
  redirectToTeamsPage() {
    this.props.history.pushState(null, '/teams');
  }

  render() {
    const { actions, errors } = this.props;

    return (
      <div className="panel">
        <article>
          <section>
            <TeamForm onSubmit={actions.teamCreate} onSuccess={this.redirectToTeamsPage.bind(this)} errors={errors}/>
          </section>
        </article>
      </div>
    );
  }
}

TeamAddPage.propTypes = {
  history: PropTypes.object.isRequired,
  actions: PropTypes.object,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  })
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
