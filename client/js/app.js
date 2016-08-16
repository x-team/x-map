// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

// Import the pages
import HomePage from './components/pages/HomePage';
import NotFoundPage from './components/pages/NotFound';
import ProfilesPage from './components/pages/ProfilesPage';
import ProfilePage from './components/pages/ProfilePage';
import ProfileEditPage from './components/pages/ProfileEditPage';
import ProfileSetLocationPage from './components/pages/ProfileSetLocationPage';
import TeamsPage from './components/pages/TeamsPage';
import TeamPage from './components/pages/TeamPage';
import TeamEditPage from './components/pages/TeamEditPage';
import TeamAddPage from './components/pages/TeamAddPage';
import ConferencesPage from './components/pages/ConferencesPage';
import ConferencePage from './components/pages/ConferencePage';
import ConferenceAddPage from './components/pages/ConferenceAddPage';
import ConferenceEditPage from './components/pages/ConferenceEditPage';
import App from './components/App';

import { setUsersVisibility } from './actions/UserActions';

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../css/main.css';

/* Assets */
import '../img/favicon.png';

// Create store
import configureStore from './store/configureStore';
const store = configureStore();

/**
 * Show X-Teamers on the Map
 */
const showUsers = () => {
  store.dispatch(setUsersVisibility(true));
};

/**
 * Hide X-Teamers on the Map
 */
const hideUsers = () => {
  store.dispatch(setUsersVisibility(false));
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={createHistory()}>
      <Route component={App}>
        <Route path="/" component={HomePage} onEnter={showUsers} />
        <Route path="/profiles" component={ProfilesPage} onEnter={showUsers} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/profile/:id/edit" component={ProfileEditPage} />
        <Route path="/profile/:id/location" component={ProfileSetLocationPage} />
        <Route path="/teams" component={TeamsPage} onEnter={showUsers} />
        <Route path="/team/new" component={TeamAddPage} />
        <Route path="/team/:id" component={TeamPage} />
        <Route path="/team/:id/edit" component={TeamEditPage} />
        <Route path="/conferences" component={ConferencesPage} onEnter={hideUsers} />
        <Route path="/conference/new" component={ConferenceAddPage} onEnter={hideUsers} />
        <Route path="/conference/:id" component={ConferencePage} onEnter={hideUsers} />
        <Route path="/conference/:id/edit" component={ConferenceEditPage} onEnter={hideUsers} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
