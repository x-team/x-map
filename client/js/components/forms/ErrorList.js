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
      for (let field in errors.fieldErrors) {
        errorList = errorList.concat(errors.fieldErrors[field].map((error, index) => <Error key={`${field}_${index}`} field={field} error={error}/>));
      }
    }

    if (!errorList.length) {
      return <span />;
    }

    return (
      <div className="errors col-md-12">
        {errorList}
      </div>
    );
  }
}

ErrorList.propTypes = {
  errors: PropTypes.shape({
    globalErrors: PropTypes.array,
    fieldErrors: PropTypes.object
  }),
  showGlobalErrors: PropTypes.bool,
  showFieldErrors: PropTypes.bool
};

ErrorList.defaultProps = {
  showGlobalErrors: true,
  showFieldErrors: false,
  errors: {}
};

export default ErrorList;
