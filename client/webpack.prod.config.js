module.exports = require("./makewebpackconfig")({
  prod: true,
  apiBaseUrl: 'http://ec2-52-33-252-13.us-west-2.compute.amazonaws.com/api/',
  googleSettings: {
    client_id: '225705573373-2q29jr53tpacq5ri1k8qqggshsb3i27u.apps.googleusercontent.com',
    scope: 'profile'
  }
});
