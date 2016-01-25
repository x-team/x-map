import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';
import { Link } from 'react-router';
import * as UserActions from '../../actions/UserActions';
import ProfileForm from '../forms/ProfileForm';

class ProfileEditPage extends Component {

  redirectToProfilePage(id) {
    this.props.history.pushState(null, '/profile/' + id);
  }

  render() {

    const { actions, errors, users, params } = this.props;

    let user;
    if (!params.id || !users[params.id]) {
      history.pushState(null, '/404')
    } else {
      user = users[params.id];
    }

    return (
      <div className="row">
        <div className="col-md-8 col-md-push-2">
          <ProfileForm user={user} onSubmit={actions.userUpdate} onSuccess={this.redirectToProfilePage.bind(this, params.id)} errors={errors}/>
        </div>
      </div>
    );
  }
}

ProfileEditPage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    users: state.users,
    errors: state.errors.userUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
