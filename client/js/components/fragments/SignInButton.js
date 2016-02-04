import React, { Component } from 'react';
import getGoogleApiClient from 'google-client-api';

class SignInButton extends Component {
  attachSignInHandler(element) {
    getGoogleApiClient(gapi => {
      gapi.auth2.getAuthInstance().attachClickHandler(element);
    });
  }

  render() {
    return <p><a ref={this.attachSignInHandler}>Sign in with Google</a></p>;
  }
}

export default SignInButton;
