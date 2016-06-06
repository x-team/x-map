import React, { Component, PropTypes } from 'react';

/* Components */
import SignInButton from './SignInButton';

/* Assets */
import LogoSVG from 'babel!svg-react!../../../img/X-Team_SVG_Logo-vertical.svg?name=LogoSVG';

/* CSS Module */
import * as styles from '../../../css/components/fragments/Loader.css';

class Loader extends Component {
  render() {
    let content = <p className="text-xs-center">Loading application data...</p>;
    if (!this.props.isSignedIn) {
      content = <SignInButton />;
    }

    return (
      <div className="loader-container">
        <video className={styles.loaderBg} loop autoPlay>
          <source src="../../../videos/bg-video.mp4" type="video/mp4"/>
        </video>
        <article id="Loader" className={styles.loader}>
          <h2 className="text-xs-center">
            <LogoSVG />
          </h2>
          <p className="text-xs-center text-uppercase"><strong>Welcome to X-Map</strong></p>
          <p className="text-xs-center">An <a href="https://github.com/x-team/x-map/" target="_blank">open source</a> project at <a
            href="http://x-team.com/community/" target="_blank">X-Team</a></p>
            {content}
        </article>
      </div>
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
