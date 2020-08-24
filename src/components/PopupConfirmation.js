import Popup from './Popup.js';

class PopupConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);

    this._confirmButton = this._popup.querySelector('.button_type_submit');
  }

  open(handleConfirm) {
    super.open();

    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm();
    });
  }
}

export default PopupConfirmation;