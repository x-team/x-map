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

export class ProfilePage extends Component {
  componentDidMount() {
    this.validateProps();
    this.props.actions.userActiveChanged([this.props.params.id]);
  }

  componentWillUpdate(props) {
    props.actions.userActiveChanged([props.params.id]);
  }

  componentDidUpdate() {
    this.validateProps();
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  validateProps() {
    const { users, history, params } = this.props;
    if (!users[params.id]) {
      history.pushState(null, '/404');
    }
  }

  render() {
    const { users, params, currentUserId, isAdmin, actions, teams } = this.props;
    const user = users[params.id];

    let poster = null;
    if (user.avatar) {
      poster = (
        <figure className="card-img-top figure">
          <img className="figure-img img-fluid"
            src={user.avatar} data-src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}/>
        </figure>
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
          <Link to="/" className="close btn btn-sm btn-secondary pull-xs-right" title="close page">&times;</Link>

          {poster}

          <header className="card-header">
            <h2 className="card-title">{user.firstName} {user.lastName}</h2>
            <div className="btn-group" role="group" aria-label="Actions menu">
              {editLink}{setLocationLink}{adminLink}
            </div>
          </header>

          <Profile user={user} canLink={canLink} canUnlink={canUnlink} onLink={onLink} onUnlink={onUnlink} teams={teams}/>
        </article>
      </DocumentTitle>
    );
  }
}

ProfilePage.propTypes = {
  actions: PropTypes.object,
  currentUserId: PropTypes.string,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  teams: PropTypes.object,
  users: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    teams: state.teams,
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
