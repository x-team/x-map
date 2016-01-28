import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TeamActions from '../../actions/TeamActions';
import { Link } from 'react-router';

class TeamsPage extends Component {

  onClickDelete(id) {
    const { actions } = this.props;
    actions.teamDelete(id);
  }

  render() {
    const { teams, isAdmin } = this.props;

    const teamProfiles = [];
    for (const id in teams) {
      let deleteButton;
      if (isAdmin) {
        deleteButton = <a href="#" className="link" onClick={this.onClickDelete.bind(this, id)}>Delete</a>;
      }

      teamProfiles.push(
        <tr key={id}>
          <td>{teams[id].name}</td>
          <td><Link to={`/team/${id}`}>View</Link> {deleteButton}</td>
        </tr>
      );
    }

    let addLink = <span/>;
    if (isAdmin) {
      addLink = (
        <section>
          <Link to="/team/new">Add team</Link>
        </section>
      );
    }

    let teamsList;
    if (teamProfiles.length) {
      teamsList = (
        <section>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {teamProfiles}
            </tbody>
          </table>
        </section>
      );
    }

    return (
      <div className="panel">
        <article id="teamProfiles">
          <header>
            <h2>Teams</h2>
          </header>

          {teamsList}

          {addLink}

        </article>
      </div>
    );
  }
}

TeamsPage.propTypes = {
  teams: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};

TeamsPage.defaultProps = {
  isAdmin: false
};

function mapStateToProps(state) {
  return {
    teams: state.teams,
    isAdmin: state.session.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TeamActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
