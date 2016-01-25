import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/AppActions';
import LoginForm from '../forms/LoginForm';
import { Link } from 'react-router';

class ProfilePage extends Component {
  render() {
    const { users, history, params, currentUser } = this.props;

    let user;
    if (!params.id || !users[params.id]) {
      history.pushState(null, '/404')
    } else {
      user = users[params.id];
    }

    let editLink = <span/>;

    if (user.id === currentUser.id) {
      editLink =
        <div className="row">
          <Link className="btn btn-success col-md-4 col-md-push-4" to={`/profile/${user.id}/edit`}>Edit profile</Link>
        </div>;
    }

    //ToDo: move to separate component
    return (
      <div id="userProfile" className="col-md-8 col-md-push-2">
        <h3>User #{user.id}</h3>
        <div className="row">
          <table className="col-md-12">
            <tbody>
            <tr>
              <th className="left">Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th className="left">First name</th>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <th className="left">Last name</th>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <th className="left">Skype ID</th>
              <td>{user.skypeId}</td>
            </tr>
            <tr>
              <th className="left">Slack ID</th>
              <td>{user.slackId}</td>
            </tr>
            <tr>
              <th className="left">Website</th>
              <td>{user.website}</td>
            </tr>
            <tr>
              <th className="left">Nationality</th>
              <td>{user.nationality}</td>
            </tr>
            <tr>
              <th className="left">About me</th>
              <td>{user.aboutMe}</td>
            </tr>
            </tbody>
          </table>
        </div>
        {editLink}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(ProfilePage);
