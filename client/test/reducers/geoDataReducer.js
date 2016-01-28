import expect from 'expect';
import geoDataReducer from '../../js/reducers/geoDataReducer';
import * as AppConstants from '../../js/constants/AppConstants';

const initialState = {
  type: 'FeatureCollection',
  features: []
};

describe('geoDataReducer', () => {
  it('should return initial state on init', () => {
    expect(geoDataReducer(undefined, {})).toEqual(initialState);
  });

  it('should add current user on APP_LOGIN_SUCCESS action', () => {
    const user = { id: 42, lat: 1, lng: 2 };
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: user
      }
    ]};
    expect(geoDataReducer(undefined, {type: AppConstants.APP_LOGIN_SUCCESS, user})).toEqual(expected);
  });

  it('should replace existing user USER_GET_SUCCESS action', () => {
    const user = { id: 42, lat: 1, lng: 2 };
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      }
    ]};
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: user
      }
    ]};
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user})).toEqual(expected);
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user}).features.length).toEqual(1);
  });

  it('should add a new user on USER_GET_SUCCESS action', () => {
    const user = { id: 43, lat: 1, lng: 2 };
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      }
    ]};
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      },
      {
        id: 43,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: user
      }
    ]};
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user})).toEqual(expected);
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user}).features.length).toEqual(2);
  });

  it('should add a new user on USER_GET_SUCCESS action', () => {
    const user = { id: 43, lat: 1, lng: 2 };
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      }
    ]};
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      },
      {
        id: 43,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: user
      }
    ]};
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user})).toEqual(expected);
    expect(geoDataReducer(state, {type: AppConstants.USER_GET_SUCCESS, user}).features.length).toEqual(2);
  });

  it('should replace users USER_LIST_SUCCESS action', () => {
    const users = [{ id: 43, lat: 1, lng: 2 }, { id: 44, lat: 1, lng: 2 }];
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      }
    ]};
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 43,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: users[0]
      },
      {
        id: 44,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: users[1]
      }
    ]};
    expect(geoDataReducer(state, {type: AppConstants.USER_LIST_SUCCESS, users})).toEqual(expected);
    expect(geoDataReducer(state, {type: AppConstants.USER_LIST_SUCCESS, users}).features.length).toEqual(2);
  });

  it('should only consider users with coordinates set on USER_LIST_SUCCESS action', () => {
    const users = [{ id: 43, lat: 1, lng: 2 }, { id: 44, lat: 1, lng: null }];
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 43,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: users[0]
      }
    ]};
    expect(geoDataReducer(undefined, {type: AppConstants.USER_LIST_SUCCESS, users})).toEqual(expected);
  });

  it('should update existing user on USER_UPDATE_SUCCESS action', () => {
    const user = { id: 42, lat: 1, lng: 2 };
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2]
        }
      }
    ]};
    const expected = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        },
        properties: user
      }
    ]};
    expect(geoDataReducer(state, {type: AppConstants.USER_UPDATE_SUCCESS, user})).toEqual(expected);
    expect(geoDataReducer(state, {type: AppConstants.USER_UPDATE_SUCCESS, user}).features.length).toEqual(1);
  });

  it('should remove all data on USER_LIST_FAILURE action', () => {
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        }
      }
    ]};

    expect(geoDataReducer(state, {type: AppConstants.USER_LIST_FAILURE})).toEqual(initialState);
  });

  it('should remove all data on APP_LOGIN_FAILURE action', () => {
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        }
      }
    ]};

    expect(geoDataReducer(state, {type: AppConstants.APP_LOGIN_FAILURE})).toEqual(initialState);
  });

  it('should remove all data on APP_LOGOUT_SUCCESS action', () => {
    const state = { type: 'FeatureCollection', features: [
      {
        id: 42,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2, 1]
        }
      }
    ]};

    expect(geoDataReducer(state, {type: AppConstants.APP_LOGOUT_SUCCESS})).toEqual(initialState);
  });
});
