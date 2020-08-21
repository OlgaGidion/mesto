class UserInfo {
  constructor(nameSelector, aboutSelector, avatarImageSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarImageElement = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatarLink: this._avatarImageElement.getAttribute('src')
    };
  }

  setUserInfo(name, about, avatarLink) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarImageElement.setAttribute('src', avatarLink);
  }
}

export default UserInfo;