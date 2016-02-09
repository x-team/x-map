import React, { Component } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

class NotFound extends Component {
  render() {
    return (
      <DocumentTitle title="Page Not Found | X-Map">
        <article id="NotFound" className="panel card card-block">
          <Link to="/" className="close btn btn-secondary">&times;</Link>

          <h3 className="card-title">Page not found.</h3>
          <p className="card-subtitle">Feeling lost?</p>
          <a className="card-link" href="https://github.com/x-team/x-map/issues" target="_blank">Ask for information.</a>
        </article>
      </DocumentTitle>
    );
  }
}

export default NotFound;
