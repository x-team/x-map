/* eslint no-unused-expressions:0 */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import createHistory from 'history/lib/createBrowserHistory';
import assignToEmpty from '../../js/utils/assign';

import { App } from '../../js/components/App';
import Loader from '../../js/components/fragments/Loader';
import Map from '../../js/components/fragments/Map';


const expect = chai.expect;
const renderer = TestUtils.createRenderer();

const createStore = fakeData => ({
  getState() {
    return fakeData;
  }
});

const providedProps = {
  store: createStore({}),
  history: createHistory()
};

function nodeContainsType(node, type) {
  if (!node) {
    return false;
  }

  if (node.type === type) {
    return true;
  }

  if (node.props && node.props.children && node.props.children.type === type) {
    return true;
  }

  if (node.props && node.props.children && Array.isArray(node.props.children)) {
    for (let i = 0; i < node.props.children.length; ++i) {
      if (nodeContainsType(node.props.children[i], type)) {
        return true;
      }
    }
  }

  return false;
}

describe('App', () => {
  it('<Loader /> is displayed if user is not authenticated', () => {
    const props = assignToEmpty(providedProps, { isSignedIn: false});

    renderer.render(<App {...props}/>);
    const output = renderer.getRenderOutput();
    expect(nodeContainsType(output, Loader)).to.be.true;
  });

  it('<Loader /> is displayed if user is authenticated but data is being loaded', () => {
    const props = assignToEmpty(providedProps, { isSignedIn: true, currentUserId: 5, usersLoaded: false, teamsLoaded: false });

    renderer.render(<App {...props}/>);
    const output = renderer.getRenderOutput();
    expect(nodeContainsType(output, Loader)).to.be.true;
  });

  it('<Map /> is not displayed if user is not authenticated', () => {
    const props = assignToEmpty(providedProps, { isSignedIn: false, currentUserId: 5, usersLoaded: false, teamsLoaded: false });
    renderer.render(<App {...props}/>);
    const output = renderer.getRenderOutput();
    expect(nodeContainsType(output, Map)).to.be.false;
  });

  it('<Loader /> is not displayed if user is authenticated and data has been loaded', () => {
    const props = assignToEmpty(providedProps, {
      isSignedIn: true,
      currentUserId: 5,
      usersLoaded: true,
      teamsLoaded: true,
      actions: {
        logout: () => {}
      }
    });

    renderer.render(<App {...props}/>);
    const output = renderer.getRenderOutput();
    expect(nodeContainsType(output, Loader)).to.be.false;
  });
});
