//TODO: delete
import PopupWithForm from './PopupWithForm.js';

class AddPopup extends PopupWithForm {
  constructor(popupSelector, validationSettings, submitFunction) {
    super(popupSelector, validationSettings);

    this._submitFunction = submitFunction;

    this._nameInput = this._popup.querySelector('.popup__input-name');
    this._imageLinkInput = this._popup.querySelector('.popup__input-description');
  }

  open() {
    super.open();

    this._nameInput.value = '';
    this._imageLinkInput.value = '';

    this._formValidator.validate();
  }

  _formSubmitHandler() {
    super._formSubmitHandler();

    this._submitFunction(this._nameInput.value, this._imageLinkInput.value);
    this.close();
  }
}

export default AddPopup;