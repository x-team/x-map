import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as UserActions from '../../actions/UserActions';

/* Components */
import ProfileForm from '../forms/ProfileForm';

class ProfileEditPage extends Component {
  componentDidMount() {
    this.props.actions.userActiveChanged([this.props.params.id]);
  }

  componentWillUpdate(props) {
    props.actions.userActiveChanged([props.params.id]);
  }

  componentWillUnmount() {
    this.props.actions.userActiveChanged([]);
  }

  redirectToProfilePage(id) {
    const { history } = this.props;
    history.pushState(null, '/profile/' + id);
  }

  render() {
    const { actions, errors, users, params, history, currentUserId, isProfileFilled } = this.props;

    const user = users[params.id];
    if (!user) {
      history.pushState(null, '/404');
      return <span/>;
    }

    let header = (
      <header className="card-header">
        <h3 className="card-title">{user.firstName} {user.lastName}</h3>
        <p className="card-subtitle">Edit profile</p>
        <Link className="text-muted" to={`/profile/${user.id}`}
              title={`Go to ${user.firstName} ${user.lastName} profile page`}>#{user.id}</Link>
      </header>
    );
    if (!isProfileFilled && currentUserId === params.id) {
      header = (
        <header className="card-header">
          <p className="card-subtitle">Please fill in required fields to proceed.</p>
        </header>);
    }

    return (
      <DocumentTitle title={`Edit profile: ${user.firstName || ''} ${user.lastName || ''} | X-Map`}>
        <article id="TeamEditPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary">&times;</Link>

          {header}

          <div className="card-block">
            <ProfileForm user={user} onSubmit={actions.userUpdate}
                         onSuccess={this.redirectToProfilePage.bind(this, params.id)} errors={errors}/>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

ProfileEditPage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  }),
  isProfileFilled: PropTypes.bool,
  currentUserId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    errors: state.errors.userUpdate,
    isProfileFilled: state.session.isProfileFilled,
    currentUserId: state.session.currentUserId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
