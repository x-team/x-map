import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Team from '../fragments/Team';

class TeamPage extends Component {
  render() {
    const { teams, history, params, isAdmin } = this.props;

    const team = teams[params.id];
    if (!team) {
      history.pushState(null, '/404');
      return <span/>;
    }

    let editLink = <span/>;
    if (isAdmin) {
      editLink = (
        <section>
          <Link to={`/team/${team.id}/edit`}>Edit team</Link>
        </section>
      );
    }

    return (
      <div className="panel">
        <article id="teamProfile">
          <header>
            <h2>Team #{team.id}</h2>
          </header>

          <section>
            <Team team={team}/>
          </section>

          {editLink}

        </article>
      </div>
    );
  }
}

TeamPage.propTypes = {
  teams: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    teams: state.teams,
    isAdmin: state.session.isAdmin
  };
}

export default connect(mapStateToProps)(TeamPage);
