import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniTeam extends Component {
  render() {
    const { team } = this.props;

    let summary = null;
    if (team.summary) {
      summary = <p className="text-muted">{team.summary}</p>;
    }

    return (
      <Link className="miniTeam media" to={`/team/${team.id}`} title={team.name}>
        <span className="media-body">
          <h4 className="media-heading">{team.name}</h4>
          {summary}
        </span>
      </Link>
    );
  }
}

MiniTeam.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniTeam;
