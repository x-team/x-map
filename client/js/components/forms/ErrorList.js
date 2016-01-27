import React, { Component, PropTypes } from 'react';
import Error from './Error';

class ErrorList extends Component {
  render() {
    const { errors, showGlobalErrors, showFieldErrors } = this.props;

    let errorList = [];

    if (showGlobalErrors && errors.globalErrors) {
      errorList = errorList.concat(errors.globalErrors.map((error, index) => <Error key={index} error={error}/>));
    }

    if (showFieldErrors && errors.fieldErrors) {
      for (const field in errors.fieldErrors) {
        errorList = errorList.concat(errors.fieldErrors[field].map((error, index) => <Error key={`${field}_${index}`} field={field} error={error}/>));
      }
    }

    if (!errorList.length) {
      return <span />;
    }

    return (
      <div className="alert error">
        {errorList}
      </div>
    );
  }
}

ErrorList.propTypes = {
  showGlobalErrors: PropTypes.bool,
  showFieldErrors: PropTypes.bool,
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  })
};

ErrorList.defaultProps = {
  showGlobalErrors: true,
  showFieldErrors: false,
  errors: {}
};

export default ErrorList;
