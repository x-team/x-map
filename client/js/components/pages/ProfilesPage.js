import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfilesPage extends Component {
  render() {
    const { users } = this.props;

    const profiles = [];
    for (const id in users) {
      profiles.push(
        <tr key={id}>
          <td>{users[id].email}</td>
          <td>{users[id].firstName} {users[id].lastName}</td>
          <td><Link className="btn btn-success col-md-12" to={`/profile/${id}`}>View</Link></td>
        </tr>
      );
    }

    if (!profiles.length) {
      return <span/>;
    }

    return (
      <div className="panel">
        <article id="userProfiles">
          <header>
            <h2>Users</h2>
          </header>

          <section>
            <table>
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
  users: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(ProfilesPage);
