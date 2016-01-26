import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/AppActions';
import LoginForm from '../forms/LoginForm';
import { Link } from 'react-router';

class ProfilePage extends Component {
  render() {
    const { users, history, params, currentUserId } = this.props;

    if (!users[params.id]) {
      history.pushState(null, '/404');
    }

    const user = users[params.id];

    let editLink = <span/>;

    if (user.id === currentUserId) {
      editLink =
        <div className="row">
          <Link className="btn btn-success col-md-4 col-md-push-4" to={`/profile/${user.id}/edit`}>Edit profile</Link>
        </div>;
    }

    //ToDo: move to separate component
    return (
      <div className="panel">
        <article id="userProfile">
          <header>
            <h2>User #{user.id}</h2>
          </header>

          <section>
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

            {editLink}
          </section>
        </article>
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
  currentUserId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUserId: state.session.currentUserId
  };
}

export default connect(mapStateToProps)(ProfilePage);
