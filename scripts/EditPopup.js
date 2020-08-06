import PopupWithForm from './PopupWithForm.js';

class EditPopup extends PopupWithForm {
  constructor(popupSelector, validationSettings) {
    super(popupSelector, validationSettings);

    this._nameInput = this._popup.querySelector('.popup__input-name');
    this._descriptionInput = this._popup.querySelector('.popup__input-description');
  }

  open(name, job) {
    super.open();

    this._nameInput.value = name;
    this._descriptionInput.value = job;

    this._formValidator.validate();
  }
}

export default EditPopup;