import React, { Component, PropTypes } from 'react';

/* Components */
import SignInButton from './SignInButton';

/* Assets */
import Logo from '../../../img/xteam-vertical.png';
import 'file?name=[name].[ext]!../../../img/xteam-vertical.png';

class Loader extends Component {
  render() {
    let content = <p className="text-xs-center">Loading application data...</p>;
    if (!this.props.isSignedIn) {
      content = <SignInButton/>;
    }

    return (
      <article id="Loader" className="page card">
        <div className="card-block">
          <h2 className="text-xs-center"><img className="logo" src={Logo} alt="A X-Labs project at X-Team"/></h2>
          <p className="text-xs-center text-uppercase"><strong>Welcome to X-Map</strong></p>
          <p className="text-xs-center">An <a href="https://github.com/x-team/x-map/" target="_blank">open source</a> project at <a
            href="http://x-team.com/community/" target="_blank">X-Team</a></p>
          {content}
        </div>
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
