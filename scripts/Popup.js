class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.button_type_close');
    this._overlay = this._popup.querySelector('.image-popup__overlay');
    //TODO use general overlay

    this._setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._closeButton.addEventListener('click', () => this.close());
    this._overlay.addEventListener('click', () => this.close());
  }

  _handleEscClose(evt) {
    if (this._isCloseKey(evt.key)) {
      this.close();
    }
  }

  _isCloseKey(key) {
    return key === 'Escape';
  }
}

class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);

    this._imageCaption = this._popup.querySelector('.image-popup__caption');
    this._image = this._popup.querySelector('.image-popup__image');

    this._name = name;
    this._link = link;
  }

  open() {
    super.open();

    this._imageCaption.textContent = this._name;
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
  }
}

export { PopupWithImage };

// class PopupWithForm extends Popup {
//   constructor(data, popupSelector) {
//     super(popupSelector);
//   }
// }