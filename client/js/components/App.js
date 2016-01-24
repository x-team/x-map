import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import * as UserActions from '../actions/UserActions';
import Header from './fragments/Header';
import assignToEmpty from '../utils/assign';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.history.listen(props.actions.routeChanged);
  }

  redirectToHomePage() {
    this.props.history.pushState(null, '/');
  }

  componentDidMount () {
    const { actions } = this.props;
    actions.userGetCurrent(this.redirectToHomePage.bind(this));
  }

  render() {
    const { currentUser, actions } = this.props;

    return (
      <div className="col-md-10 col-md-push-1">
        <Header user={currentUser} onLogout={actions.logout}/>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(AppActions, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
