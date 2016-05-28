import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MiniConference extends Component {
  render() {
    const { conference } = this.props;

    return (
      <Link className="miniConference list-group-item" to={`/conference/${conference.id}`} title={`View details of ${conference.name}`}>
        <h4 className="list-group-item-heading">{conference.name}</h4>
        {(() => {
          if (conference.summary !== '') {
            return (<p className="list-group-item-text">{conference.summary}</p>);
          }
        })()}
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
