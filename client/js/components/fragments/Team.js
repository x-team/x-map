import React, { Component, PropTypes } from 'react';

class Team extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = props.team;
  }

  render() {
    const { team } = this.props;

    return (
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <td>{team.name}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{team.description}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

Team.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default Team;
