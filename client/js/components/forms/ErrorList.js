import React, { Component, PropTypes } from 'react';
import Error from './Error';

class ErrorList extends Component {
  render() {
    const { errors } = this.props;

    var errorsList = [];

    if (errors && errors.errors && errors.errors.children) {
      const children = errors.errors.children;
      for (var field in children) {
        if (children[field].errors && children[field].errors.length) {
          errorsList.push(<Error key={field} field={field} error={children[field].errors[0]}/>);
        }
      }
    }

    if (!errorsList.length) {
      return <span />;
    }

    return (
      <div className="errors col-md-12">
        {errorsList}
      </div>
    );
  }
}

ErrorList.propTypes = {
  errors: PropTypes.object
}

export default ErrorList;
