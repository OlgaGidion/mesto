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
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  getCards() {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards', {
        method: 'GET',
        headers: this._headers
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  addCard(name, link) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  deleteCard(cardId) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  updateUserInfo(name, about) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  updateAvatar(avatar) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar})
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  likeCard(cardId) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: this._headers
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  unlikeCard(cardId) {
    return new Promise((resolve, reject) => {
      fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => this._handleResponse(res, resolve, reject));
    });
  }

  _handleResponse(res, resolve, reject) {
    if (res.ok) {
      resolve(res.json());
      return;
    }

    reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
}

export default Api;