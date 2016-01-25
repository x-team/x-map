import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/AppActions';
import LoginForm from '../forms/LoginForm';
import { Link } from 'react-router';

class ProfilesPage extends Component {
  render() {

    const { users } = this.props;

    let profiles = [];

    for(let id in users) {
      profiles.push(
        <tr key={id}>
          <td>{users[id].email}</td>
          <td>{users[id].firstName} {users[id].lastName}</td>
          <td><Link className="btn btn-success col-md-12" to={`/profile/${id}`}>View</Link></td>
        </tr>
      );
    }

    return (
      <div className="panel">
        <article id="userProfiles">
          <header>
            <h2>Profiles</h2>
          </header>

          <section>
            <table className="col-md-12">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles}
              </tbody>
            </table>
          </section>
        </article>
      </div>
    );
  }
}

ProfilesPage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
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

export default connect(mapStateToProps)(ProfilesPage);
