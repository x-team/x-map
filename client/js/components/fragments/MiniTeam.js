import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniTeam extends Component {
  render() {
    const { team } = this.props;

    return (
      <Link className="miniTeam list-group-item" to={`/team/${team.id}`} title={`View ${team.name}'s profile page`}>
        <h4 className="list-group-item-heading">{team.name}</h4>
        {(() => { if (team.summary != '') { return (
          <p className="list-group-item-text">{team.summary}</p>
        )}})()}
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
