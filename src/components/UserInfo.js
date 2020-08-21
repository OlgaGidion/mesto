class UserInfo {
  constructor(nameSelector, aboutSelector, avatarImageSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarImageElement = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatarLink: this._avatarImageElement.getAttribute('src')
    };
  }

  setUserInfo(id, name, about, avatarLink) {
    this._id = id;
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarImageElement.setAttribute('src', avatarLink);
  }
}

export default UserInfo;