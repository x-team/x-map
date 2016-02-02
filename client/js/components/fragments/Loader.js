import React, { Component, PropTypes } from 'react';
import SignInButton from './SignInButton';

import Logo from '../../../img/xteam-vertical.png';
import 'file?name=[name].[ext]!../../../img/xteam-vertical.png';

class Loader extends Component {
  render() {
    let content = <p>Loading application data...</p>;
    if (!this.props.isSignedIn) {
      content = <SignInButton/>;
    }

    return (
      <div id="loading" className="panel panel-homescreen">
        <article>
          <section>
            <h1><img className="logo" src={Logo} alt="X-Team"/></h1>
            <h2>Welcome to X-Map</h2>
            <p>An <a href="https://github.com/x-team/x-map/" target="_blank">open source</a> project at <a
              href="http://x-team.com/community/" target="_blank">X-Team</a></p>
            {content}
          </section>
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
