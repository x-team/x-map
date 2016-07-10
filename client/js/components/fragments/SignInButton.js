import React, { Component, PropTypes } from 'react';

import styles from '../../../css/components/fragments/Loader.css';

class SignInButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clickHandlerAttached: false
    };
  }

  attachSignInHandler(element) {
    if (!this.state.clickHandlerAttached) {
      this.setState({
        clickHandlerAttached: true
      });
      this.props.auth.getAuthInstance().attachClickHandler(element);
    }
  }

  render() {
    if (this.props.auth) {
      return (
        <p id="SignInButton" className={styles.signInBtn}>
          <a className="btn" ref={this.attachSignInHandler.bind(this)}>Sign in with Google</a>
        </p>
      );
    }

    return null;
  }
}

SignInButton.propTypes = {
  auth: PropTypes.object
};

export default SignInButton;
