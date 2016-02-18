import React, { Component, PropTypes } from 'react';

class Error extends Component {
  render() {
    const { field, error } = this.props;

    let fieldString = '';

    if (field) {
      fieldString = `${field}: `;
    }

    return (
      <div>
        <strong>{fieldString}</strong>
        <br/>
        {error}
      </div>
    );
  }
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
  field: PropTypes.string
};

export default Error;
