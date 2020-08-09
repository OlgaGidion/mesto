import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageCaption = this._popup.querySelector('.image-popup__caption');
    this._image = this._popup.querySelector('.image-popup__image');
  }

  open(name, imageLink) {
    super.open();

    this._imageCaption.textContent = name;
    this._image.setAttribute('src', imageLink);
    this._image.setAttribute('alt', name);
  }
}

export default PopupWithImage;