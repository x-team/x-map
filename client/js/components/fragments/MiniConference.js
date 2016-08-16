import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniConference extends Component {

  getDate(conference) {
    let date = '';

    if (conference.dateStart) {
      date += conference.dateStart;
    }

    if (conference.dateEnd && conference.dateEnd !== conference.dateStart) {
      date += ' - ' + conference.dateEnd;
    }

    return date;
  }

  render() {
    const { conference } = this.props;

    return (
      <Link className="miniConference list-group-item" to={`/conference/${conference.id}`} title={`View details of ${conference.name}`}>
        <h4 className="list-group-item-heading">{conference.name}</h4>
        <p className="list-group-item-text">{this.getDate(conference)}</p>
      </Link>
    );
  }
}

MiniConference.propTypes = {
  conference: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default MiniConference;
