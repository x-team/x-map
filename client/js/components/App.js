import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import * as UserActions from '../actions/UserActions';
import * as TeamActions from '../actions/TeamActions';
import assignToEmpty from '../utils/assign';
import Header from './fragments/Header';
import HeaderLoading from './fragments/HeaderLoading';
import Map from './fragments/Map';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.history.listen(props.actions.routeChanged);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.authenticate(() => {
      actions.userList();
      actions.teamList();
    }, this.redirectToHomePage.bind(this));
  }

  redirectToHomePage() {
    this.props.history.push('/');
  }

  redirectToProfilePage(id) {
    this.props.history.push('/profile/' + id);
  }

  render() {
    const { currentUserId, currentUserLoaded, usersLoaded, teamsLoaded, users, actions } = this.props;

    let app;
    if (currentUserLoaded && (!currentUserId || (usersLoaded && teamsLoaded))) {
      app = (
        <section>
          <Header user={users[currentUserId]} onLogout={actions.logout.bind(null, this.redirectToHomePage.bind(this))}/>
          { this.props.children }
          <Map onFeatureClick={this.redirectToProfilePage.bind(this)}/>
        </section>
      );
    } else {
      app = (
        <section>
          <HeaderLoading/>
          <Map />
        </section>
      );
    }

    return app;
  }
}

App.propTypes = {
  currentUserId: PropTypes.string,
  currentUserLoaded: PropTypes.bool,
  usersLoaded: PropTypes.bool,
  teamsLoaded: PropTypes.bool,
  actions: PropTypes.object,
  users: PropTypes.object,
  history: PropTypes.object.isRequired,
  children: PropTypes.object
};

App.defaultProps = {
  currentUserLoaded: false,
  usersLoaded: false,
  teamsLoaded: false,
  users: {}
};

function mapStateToProps(state) {
  return {
    currentUserId: state.session.currentUserId,
    currentUserLoaded: state.session.currentUserLoaded,
    usersLoaded: state.session.usersLoaded,
    teamsLoaded: state.session.teamsLoaded,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(AppActions, UserActions, TeamActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
