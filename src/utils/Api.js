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

  getCard() {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards', {
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

  updateUserInfo(name, about) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
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

  updateAvatar(avatar) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar})
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