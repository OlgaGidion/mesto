class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.button_type_close');
    this._overlay = this._popup.querySelector('.popup__overlay');

    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    };
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._overlay.addEventListener('click', () => this.close());
  }
}

export default Popup;