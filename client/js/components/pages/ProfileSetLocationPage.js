import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import assignToEmpty from '../../utils/assign';

import * as UserActions from '../../actions/UserActions';

class ProfileSetLocationPage extends Component {
  componentDidMount() {
    this.validateProps();
    const user = this.props.users[this.props.params.id];
    this.props.actions.userUpdatesLocation(user.lat, user.lng);
  }

  componentDidUpdate() {
    this.validateProps();
  }

  componentWillUnmount() {
    this.props.actions.userUpdatedLocation();
  }

  redirectToProfilePage(id) {
    this.props.history.push('/profile/' + id);
  }

  validateProps() {
    const { users, history, params } = this.props;
    if (!users[params.id]) {
      history.pushState(null, '/404');
    }
  }

  save() {
    const { actions, currentLocation, params, users } = this.props;

    const user = users[params.id];
    const changeset = {
      lat: currentLocation.lat,
      lng: currentLocation.lng
    };

    actions.userUpdate(assignToEmpty(user, changeset), this.redirectToProfilePage.bind(this, params.id));
  }

  render() {
    const { users, params, currentLocation } = this.props;
    const user = users[params.id];

    return (
      <DocumentTitle title={`Set location: ${user.firstName} ${user.lastName} | X-Map`}>
        <article id="ProfileSetLocationPage" className="page card">
          <Link to="/" className="close btn btn-sm btn-secondary">&times;</Link>

          <header className="card-header">
            <h3 className="card-title">{user.firstName} {user.lastName}</h3>
            <p className="card-subtitle">Set location</p>
            <Link className="text-muted" to={`/profile/${params.id}`} title={`Go to ${user.firstName} ${user.lastName} profile page`}>#{user.id}</Link>
          </header>

          <div className="card-block">
            <p className="card-text">Click in the map to select current location then click save.</p>
            <button className="btn btn-primary" type="button" disabled={!currentLocation} onClick={this.save.bind(this)}>Save</button>
            <span> </span>
            <Link className="btn btn-secondary" to={`/profile/${params.id}`} title={`Go to ${user.firstName} ${user.lastName} profile page`}>Cancel</Link>
          </div>
        </article>
      </DocumentTitle>
    );
  }
}

ProfileSetLocationPage.propTypes = {
  users: PropTypes.object.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })
};

function mapStateToProps(state) {
  return {
    users: state.users,
    currentLocation: state.session.currentLocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetLocationPage);
