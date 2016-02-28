import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import * as UserActions from '../../actions/UserActions';

/* Components */
import ProfileForm from '../forms/ProfileForm';

export class ProfileEditPage extends Component {
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

  redirectToProfilePage(id) {
    const { history } = this.props;
    history.pushState(null, '/profile/' + id);
  }

  validateProps() {
    const { users, params, history } = this.props;
    if (!users[params.id]) {
      history.pushState(null, '/404');
    }
  }

  render() {
    const { actions, errors, users, params, currentUserId, isProfileFilled } = this.props;
    const user = users[params.id];

    let header = (
      <header className="card-header">
        <h2 className="card-title">Edit profile</h2>
        <Link className="text-muted" to={`/profile/${params.id}`} title={`Go to ${user.firstName} ${user.lastName} profile page`}>{user.firstName} {user.lastName}</Link>
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
          <Link to="/" className="close btn btn-sm btn-secondary" title="close page">&times;</Link>

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
  actions: PropTypes.object,
  currentUserId: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  }),
  history: PropTypes.object.isRequired,
  isProfileFilled: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.object.isRequired
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
