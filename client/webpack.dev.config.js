module.exports = require("./makewebpackconfig")({
  prod: false,
  apiBaseUrl: 'http://x-map.app/api/',
  googleSettings: {
    client_id: '314444994198-lpaod0pmpdrunigb3of205a3iufej9ml.apps.googleusercontent.com',
    scope: 'profile',
  },
  mapsKey: 'AIzaSyAYCGltppLwZJ_p4DsKJ-xWPeEe0NkGTCA'
});
