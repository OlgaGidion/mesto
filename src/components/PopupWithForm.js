import Popup from './Popup.js';
import FormValidator from './FormValidator.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, validationSettings) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');

    this._formValidator = new FormValidator(validationSettings, this._form);
    this._formValidator.enableValidation();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => this._formSubmitHandler());
  }

  _formSubmitHandler() {
  }
}

export default PopupWithForm;