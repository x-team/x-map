import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniTeam extends Component {
  render() {
    const { team } = this.props;

    let summary = null;
    if (team.summary) {
      summary = <p>{team.summary}</p>;
    }

    return (
      <span>
        <h3><Link to={`/team/${team.id}`}>{team.name}</Link></h3>
        {summary}
      </span>
    );
  }
}

MiniTeam.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniTeam;
