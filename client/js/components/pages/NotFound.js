import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div className="panel">
        <article className="page-not-found">
          <section>
            <h1>Page not found.</h1>
            <Link to="/" className="btn">Home</Link>
          </section>
        </article>
      </div>
    );
  }
}

export default NotFound;
