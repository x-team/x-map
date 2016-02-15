module.exports = require("./makewebpackconfig")({
  prod: true,
  apiBaseUrl: '/api/',
  googleSettings: {
    client_id: '225705573373-2q29jr53tpacq5ri1k8qqggshsb3i27u.apps.googleusercontent.com',
    scope: 'profile'
  }
});
