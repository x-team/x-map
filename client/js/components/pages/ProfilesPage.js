import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';
import MiniProfile from '../fragments/MiniProfile';

class ProfilesPage extends Component {
  markUserAsActive(id) {
    this.props.actions.userActiveChanged([id]);
  }

  markUserAsInactive() {
    this.props.actions.userActiveChanged([]);
  }

  render() {
    const { users } = this.props;

    const profiles = [];
    for (const id in users) {
      profiles.push(
        <li key={id} onMouseOver={this.markUserAsActive.bind(this, id)} onMouseOut={this.markUserAsInactive.bind(this)}>
          <MiniProfile user={users[id]}/>
        </li>
      );
    }

    if (!profiles.length) {
      profiles.push(<p className="alert error">Something has gone wrong. No profiles found.</p>);
    }

    return (
      <div className="panel">
        <article id="userProfiles">
          <header>
            <h2>Profiles</h2>
          </header>

          <section>
            <ul className="horizontal-list">
              {profiles}
            </ul>
          </section>
        </article>
      </div>
    );
  }
}

ProfilesPage.propTypes = {
  users: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);
