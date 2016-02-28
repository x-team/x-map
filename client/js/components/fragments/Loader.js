import React, { Component, PropTypes } from 'react';

/* Components */
import SignInButton from './SignInButton';

/* Assets */
import LogoSVG from 'babel!svg-react!../../../img/X-Team_SVG_Logo-vertical.svg?name=LogoSVG';

/* CSS Module */
import styles from '../../../css/components/fragments/Loader.css';

class Loader extends Component {
  render() {
    let content = <p className="text-xs-center">Loading application data...</p>;
    if (!this.props.isSignedIn) {
      content = <SignInButton/>;
    }

    return (
      <article id="Loader" className={styles.loader}>
        <h2 className="text-xs-center">
          <LogoSVG />
        </h2>
        <p className="text-xs-center text-uppercase"><strong>Welcome to X-Map</strong></p>
        <p className="text-xs-center">An <a href="https://github.com/x-team/x-map/" target="_blank">open source</a> project at <a
          href="http://x-team.com/community/" target="_blank">X-Team</a></p>
        {content}
      </article>
    );
  }
}

Loader.defaultProps = {
  isSignedIn: true
};

Loader.propTypes = {
  isSignedIn: PropTypes.bool
};

export default Loader;
