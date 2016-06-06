import React, { Component } from 'react';
import getGoogleApiClient from 'google-client-api';

import styles from '../../../css/components/fragments/Loader.css';

class SignInButton extends Component {
  attachSignInHandler(element) {
    getGoogleApiClient(gapi => {
      gapi.auth2.getAuthInstance().attachClickHandler(element);
    });
  }

  render() {
    return (
      <p id="SignInButton" className={styles.signInBtn}>
        <a className="btn" ref={this.attachSignInHandler}>Sign in with Google</a>
      </p>
    );
  }
}

export default SignInButton;
