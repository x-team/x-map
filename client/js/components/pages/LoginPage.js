import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/AppActions';
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
  redirectToHomePage() {
    this.props.history.pushState(null, '/');
  }

  render() {
    const { actions, errors } = this.props;

    return (
      <div className="panel">
        <LoginForm onSubmit={actions.login} onSuccess={this.redirectToHomePage.bind(this)} errors={errors} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors.appLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
