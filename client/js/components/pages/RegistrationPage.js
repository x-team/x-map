import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import RegistrationForm from '../forms/RegistrationForm';

class RegistrationPage extends Component {
  redirectToHomePage() {
    this.props.history.pushState(null, '/');
  }

  render() {
    const { actions, errors } = this.props;

    return (
      <div className="panel">
        <RegistrationForm onSubmit={ actions.userCreate } onSuccess={ this.redirectToHomePage.bind(this) } errors={ errors }/>
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  actions: PropTypes.object,
  errors: PropTypes.object
};


function mapStateToProps(state) {
  return {
    errors: state.errors.userCreate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
