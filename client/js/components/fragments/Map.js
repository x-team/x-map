import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';

class Map extends Component {
  componentDidMount() {
    // https://developers.google.com/maps/documentation/javascript/reference
    // https://developers.google.com/maps/documentation/javascript/libraries
    // https://developers.google.com/maps/documentation/javascript/controls
    GoogleMapsLoader.VERSION = '3.22';
    GoogleMapsLoader.LIBRARIES = ['drawing'];
    GoogleMapsLoader.load(google => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 50},
        zoom: 3,
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

      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: false,
        drawingControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE
          ]
        },
        circleOptions: {
          fillColor: '#ffff00',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      });
      drawingManager.setMap(this.map);
    });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default Map;
