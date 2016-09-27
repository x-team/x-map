
/**
 * Returns a Conference Marker.
 * Currently has strong global dependency, but should be changed.
 * @param  {Object} conference - Conference Object
 * @param  {String} icon       - Icon URL
 * @returns {Maps Marker}      - Google Maps Marker
 */
export const getConferenceMarker = (conference, icon) => {
  return new window.google.maps.Marker({
    map: window.map,
    position: {
      lat: conference.lat,
      lng: conference.lng
    },
    title: conference.name,
    icon
  });
};
