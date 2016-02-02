import React, { Component } from 'react';
import getGoogleApiClient from 'google-client-api';

class HeaderAnonymous extends Component {
  componentDidMount() {
    getGoogleApiClient(gapi => {
      gapi.load('signin2', () => {
        gapi.signin2.render('g-signin2', {
          longtitle: true,
          width: 300,
          height: 60
        });
      });
    });
  }

  render() {
    return (
      <div>
        <nav className="navigation">
          <div id="g-signin2"></div>
        </nav>
      </div>
    );
  }
}

export default HeaderAnonymous;
