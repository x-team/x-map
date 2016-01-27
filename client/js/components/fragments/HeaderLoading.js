import React, { Component } from 'react';
import { Link } from 'react-router';

import Logo from '../../../img/logo.png';
import 'file?name=[name].[ext]!../../../img/logo.png';

class HeaderLoading extends Component {
  render() {
    return (
      <header id="header">
        <Link id="logo" to="/">
          <img className="logo" src={Logo} alt="X-Map brand"/>
        </Link>
        <h1>Loading application data...</h1>
        <span/>
      </header>
    );
  }
}

export default HeaderLoading;
