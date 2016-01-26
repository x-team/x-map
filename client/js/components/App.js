import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import * as UserActions from '../actions/UserActions';
import assignToEmpty from '../utils/assign';
import Header from './fragments/Header';
import HeaderLoading from './fragments/HeaderLoading';
import Map from './fragments/Map';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.history.listen(props.actions.routeChanged);
  }

  redirectToHomePage() {
    this.props.history.push('/');
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.userGetCurrent(() => actions.userList());
  }

  render() {
    const { currentUserId, currentUserLoaded, usersLoaded, users, actions } = this.props;

    let app;
    if (currentUserLoaded && (!currentUserId || usersLoaded)) {
      app =
        <section>
          <Header user={users[currentUserId]}
                  onLogout={actions.logout}
                  onLogoutSuccess={this.redirectToHomePage.bind(this)}
          />
          { this.props.children }
          <Map />
        </section>;
    } else {
      app =
        <section>
          <HeaderLoading/>
          <Map />
        </section>;
    }

    return app;
  }
}

App.propTypes = {
  currentUserId: PropTypes.string,
  currentUserLoaded: PropTypes.bool,
  usersLoaded: PropTypes.bool,
  actions: PropTypes.object,
  users: PropTypes.object
};

App.defaultProps = {
  currentUserLoaded: false,
  usersLoaded: false
};

function mapStateToProps(state) {
  return {
    currentUserId: state.session.currentUserId,
    currentUserLoaded: state.session.currentUserLoaded,
    usersLoaded: state.session.usersLoaded,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(AppActions, UserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
