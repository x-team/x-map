import React, { Component } from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

class NotFound extends Component {
  render() {
    return (
      <DocumentTitle title="Error | X-Map">
        <div className="panel">
          <article className="page-not-found">
            <section>
              <h1>Page not found.</h1>
              <Link to="/" className="btn">Home</Link>
            </section>
          </article>
        </div>
      </DocumentTitle>
    );
  }
}

export default NotFound;
