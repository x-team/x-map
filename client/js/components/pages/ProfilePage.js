import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfilePage extends Component {
  render() {
    const { users, history, params, currentUserId, isAdmin } = this.props;

    const user = users[params.id];
    if (!user) {
      history.pushState(null, '/404');
      return <span/>;
    }

    let editLink = <span/>;
    if (isAdmin || user.id === currentUserId) {
      editLink = <Link to={`/profile/${user.id}/edit`}>Edit profile</Link>;
    }

    // ToDo: move to separate component
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
  currentUserId: PropTypes.string,
  isAdmin: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentUserId: state.session.currentUserId,
    isAdmin: state.session.isAdmin
  };
}

export default connect(mapStateToProps)(ProfilePage);
