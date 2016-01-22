import React, { Component, PropTypes } from 'react';

class FieldError extends Component {
  render() {
    const { field, error } = this.props;

    return (
      <div>
        <strong>{field}: {error}</strong>
      </div>
    );

  }
}

FieldError.propTypes = {
  field: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
};

export default FieldError;
