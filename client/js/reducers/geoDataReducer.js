import {
  APP_LOGIN_FAILURE,
  APP_LOGOUT_SUCCESS,
  APP_LOGIN_SUCCESS,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  type: 'FeatureCollection',
  features: []
};

function geoDataReducer(geoData = initialState, action) {
  Object.freeze(geoData);

  switch (action.type) {
    case USER_LIST_SUCCESS:
      const users = {};
      action.users.forEach((user) => {
        users[user.id] = user;
      });
      return convertToFeatureCollection(users);
    case USER_GET_SUCCESS:
    case USER_UPDATE_SUCCESS:
    case APP_LOGIN_SUCCESS:
      if (typeof action.user.lat === 'number' && typeof action.user.lng === 'number') {
        return insertOrUpdateFeature(convertToFeature(action.user), assignToEmpty(geoData));
      }
      return geoData;
    case USER_GET_FAILURE:
    case USER_DELETE_SUCCESS:
      return removeFeature(convertToFeature({id: action.id}), assignToEmpty(geoData));
    case APP_LOGIN_FAILURE:
    case APP_LOGOUT_SUCCESS:
    case USER_LIST_FAILURE:
      return initialState;
    default:
      return geoData;
  }
}

function convertToFeatureCollection(objects) {
  const newCollection = assignToEmpty(initialState);
  newCollection.features = [];

  for (const id in objects) {
    if (typeof objects[id].lat === 'number' && typeof objects[id].lng === 'number') {
      newCollection.features.push(convertToFeature(objects[id]));
    }
  }

  return newCollection;
}

function insertOrUpdateFeature(feature, featureCollection) {
  const newCollection = removeFeature(feature, featureCollection);
  newCollection.features.push(feature);

  return newCollection;
}

function convertToFeature(object) {
  return {
    type: 'Feature',
    id: object.id,
    geometry: {
      type: 'Point',
      coordinates: [
        object.lng,
        object.lat
      ]
    },
    properties: assignToEmpty(object)
  };
}

function removeFeature(feature, featureCollection) {
  const newCollection = assignToEmpty(featureCollection);
  newCollection.features = [];

  featureCollection.features.forEach(existingFeature => {
    if (existingFeature.id !== feature.id) {
      newCollection.features.push(existingFeature);
    }
  });

  return newCollection;
}

export default geoDataReducer;
