import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import * as UserActions from '../actions/UserActions';
import assignToEmpty from '../utils/assign';
import Header from './fragments/Header';
import Map from './fragments/Map';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.history.listen(props.actions.routeChanged);
  }

  redirectToHomePage() {
    const { actions } = this.props;
    actions.userList();
    this.props.history.pushState(null, '/');
  }

  componentDidMount () {
    const { actions } = this.props;
    actions.userGetCurrent(this.redirectToHomePage.bind(this));
  }

  render() {
    const { currentUser, actions } = this.props;

    return (
      <section>
        <Header user={ currentUser } onLogout={ actions.logout } onLogoutSuccess={ this.redirectToHomePage.bind(this) } />
        { this.props.children }
        <Map />
      </section>
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
