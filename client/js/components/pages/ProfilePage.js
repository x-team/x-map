import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import assignToEmpty from '../../utils/assign';

import * as UserActions from '../../actions/UserActions';
import * as TeamActions from '../../actions/TeamActions';

/* Components */
import Profile from '../fragments/Profile';

class ProfilePage extends Component {
  componentDidMount() {
    this.props.actions.userActiveChanged([this.props.params.id]);
  }

  componentWillUpdate(props) {
    props.actions.userActiveChanged([props.params.id]);
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  render() {
    const { users, history, params, currentUserId, isAdmin, actions } = this.props;

    const user = users[params.id];
    if (!user) {
      history.pushState(null, '/404');
      return <span/>;
    }

    let poster = null;
    if (user.avatar) {
      poster = (
        <div className="card-img-top text-xs-center">
          <img src={user.avatar} data-src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}/>
        </div>
      );
    }

    let editLink = null;
    let setLocationLink = null;
    if (isAdmin || user.id === currentUserId) {
      editLink = <Link className="btn btn-secondary btn-sm" to={`/profile/${user.id}/edit`}>Edit profile</Link>;
      setLocationLink = <Link className="btn btn-secondary btn-sm" to={`/profile/${user.id}/location`}>Set location</Link>;
    }

    let adminLink = null;
    if (isAdmin && user.id !== currentUserId) {
      const grantRevokeText = user.isAdmin ? 'Revoke admin' : 'Grant admin';
      const grantRevokeAction = user.isAdmin ? actions.userRevokeAdmin.bind(null, user.id) : actions.userGrantAdmin.bind(null, user.id);
      adminLink = <a className="btn btn-secondary btn-sm" onClick={grantRevokeAction}>{grantRevokeText}</a>;
    }

    const canLink = isAdmin || user.id === currentUserId;
    const canUnlink = canLink;
    const onLink = actions.teamLinkUser;
    const onUnlink = actions.teamUnlinkUser;

    return (
      <DocumentTitle title={`Profile: ${user.firstName || ''} ${user.lastName || ''} | X-Map`}>
        <article id="ProfilePage" className="page card">
          <Link to="/" className="close btn btn-secondary">&times;</Link>

          {poster}

          <header className="card-header">
            <h3 className="card-title">{user.firstName} {user.lastName}</h3>
            <p className="card-subtitle">Profile page</p>
            <p className="text-muted">#{user.id}</p>
            <div className="btn-group" role="group" aria-label="Actions menu">
              {editLink}{setLocationLink}{adminLink}
            </div>
          </header>

          <div className="card-block">
            <Profile user={user} canLink={canLink} canUnlink={canUnlink} onLink={onLink} onUnlink={onUnlink}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

ProfilePage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
  isAdmin: PropTypes.bool,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUserId: state.session.currentUserId,
    isAdmin: state.session.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(assignToEmpty(UserActions, TeamActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
