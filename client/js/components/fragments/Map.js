import {
  MAP_MODE_SELECT,
  MAP_MODE_SHOW
} from '../../constants/AppConstants';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as UserActions from '../../actions/UserActions';

import GoogleMapsLoader from 'google-maps';
import deepEqual from 'deep-equal';
import nite from '../../utils/nite';

/* Assets */
import blueMarker from '../../../img/blueMarker.png';

/* CSS Module */
import styles from '../../../css/components/fragments/Map.css';

export class Map extends Component {
  componentDidMount() {
    GoogleMapsLoader.load(this.configureMap.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.users, prevProps.users)) {
      this.loadData(this.props.users, prevProps.users);
    }
    this.updateCurrentLocationMarker();
    this.updateMapStyle();
  }

  getCenterLatLng(lat, lng) {
    const northEast = this.map.getBounds().getNorthEast();
    const southWest = this.map.getBounds().getSouthWest();

    const lngWidth = northEast.lng() - southWest.lng();

    return new window.google.maps.LatLng(lat, lng + lngWidth * 0.25);
  }

  configureMap(google) {
    this.map = new google.maps.Map(document.getElementById('Map'), {
      center: {lat: 0, lng: 0},
      zoom: 2,
      minZoom: 2,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeIds: [
        google.maps.MapTypeId.HYBRID,
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.TERRAIN
      ],
      scaleControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    nite.init(this.map);

    this.currentLocationMarker = new google.maps.Marker({
      icon: blueMarker
    });

    google.maps.event.addListener(this.map, 'click', event => {
      if (this.props.mapMode === MAP_MODE_SELECT) {
        this.currentLocationMarker.setPosition(event.latLng);
        this.props.actions.userSelectedLocation(event.latLng.lat(), event.latLng.lng());
      }
    });

    this.map.data.addListener('click', event => {
      if (this.props.mapMode === MAP_MODE_SHOW) {
        if (this.props.onFeatureClick) {
          this.props.onFeatureClick(event.feature.getId());
        }

        // this.map.panTo(this.getCenterLatLng(event.latLng.lat(), event.latLng.lng()));
      }
    });

    this.loadData(this.props.users);
    this.updateMapStyle();
  }

  loadData(users, prevUsers) {
    if (prevUsers) {
      // do a diff, remove features that don't exist in new dataset
      const newData = new window.google.maps.Data();
      newData.addGeoJson(users);
      this.map.data.forEach(feature => {
        if (!newData.getFeatureById(feature.getId())) {
          this.map.data.remove(feature);
        }
      });
    }

    this.map.data.addGeoJson(users);
  }

  updateCurrentLocationMarker() {
    if (this.props.currentLocation) {
      this.currentLocationMarker.setPosition(this.props.currentLocation);
      this.currentLocationMarker.setMap(this.props.mapMode === MAP_MODE_SELECT ? this.map : null);
    }
  }

  updateMapStyle() {
    this.map.data.setStyle(feature => {
      if (this.props.mapMode === MAP_MODE_SELECT) {
        return {
          visible: false
        };
      }

      if (this.props.activeUserIds.indexOf(feature.getId()) !== -1) {
        if (this.props.activeUserIds.length === 1) {
          // this.map.panTo(this.getCenterLatLng(feature.getGeometry().get().lat(), feature.getGeometry().get().lng()));
        }

        return {
          icon: (feature.getProperty('avatar') ? (feature.getProperty('avatar') + '?sz=50') : blueMarker)
        };
      } else if (feature.getProperty('avatar')) {
        return {
          icon: feature.getProperty('avatar') + '?sz=35'
        };
      }
    });
  }

  render() {
    return (
      <div id="Map" className={styles.map}></div>
    );
  }
}

Map.propTypes = {
  actions: PropTypes.object.isRequired,
  activeUserIds: PropTypes.array,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  mapMode: PropTypes.oneOf([MAP_MODE_SELECT, MAP_MODE_SHOW]).isRequired,
  onFeatureClick: PropTypes.func,
  users: PropTypes.object.isRequired
};

Map.defaultProps = {
  mapMode: MAP_MODE_SHOW
};

function mapStateToProps(state) {
  return {
    users: state.geoData,
    activeUserIds: state.session.activeUserIds,
    currentLocation: state.session.currentLocation,
    mapMode: state.session.mapMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
