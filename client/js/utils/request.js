const request = (url, options = {}) => {
  return fetch(url, options).then(response => {
    if (response.status >= 300) {
      return new Promise((resolve, reject) => response.json().then(reject));
    }

    if (response.status === 204) {
      return new Promise((resolve, reject) => resolve());
    }

    return new Promise((resolve, reject) => resolve(response.json()));
  });
};

export default request;
