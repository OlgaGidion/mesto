class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'authorization': token,
      'content-type': 'application/json'
    };
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/users/me', {
        method: 'GET',
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          resolve(res.json());
          return;
        }
        reject(res.status);
      });
    });
  }
}

export default Api;