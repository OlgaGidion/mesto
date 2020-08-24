class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'authorization': token,
      'content-type': 'application/json'
    };
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
        method: 'GET',
        headers: this._headers
      })
      .then(this._handleResponse);
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
        method: 'GET',
        headers: this._headers
      })
      .then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse);
  }

  updateUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then(this._handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar})
      })
      .then(this._handleResponse);
  }

  likeCard(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._handleResponse);
  }

  unlikeCard(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
}

export default Api;